const axios = require('axios');
const { API_CONFIG } = require('./constants');

const flatten = arr => [].concat.apply([], arr);

const formatItem = data => ({
    id: data.id,
    title: data.title,
    price: {
        currency: data['currency_id'],
        amount: data.price,
        decimals:
            String(data.price).split('.').length === 2
                ? Number(String(data.price).split('.')[1])
                : 0,
    },
    picture: data.thumbnail,
    condition: data.condition,
    free_shipping: data.shipping['free_shipping'],
});

const author = {
    name: 'Micael',
    lastname: 'Robles',
};

const searchItems = async ({ query }) => {
    try {
        const resultsData = (await axios.get(
            API_CONFIG.getSearchItemsUrl({ query }),
        )).data;

        let categories = [];
        const categoryObj = resultsData.filters.find(
            filter => filter.id === 'category',
        );

        if (categoryObj) {
            categories = flatten(
                categoryObj.values.map(category =>
                    category['path_from_root'].map(
                        rootCategory => rootCategory.name,
                    ),
                ),
            );
        }

        const items = resultsData.results.slice(0, 4).map(formatItem);

        return {
            author,
            categories,
            items,
        };
    } catch (err) {
        console.error(err);
        return {
            error: err,
        };
    }
};

const getItem = async ({ itemId }) => {
    try {
        const [detailsResponse, descriptionResponse] = await Promise.all([
            axios.get(API_CONFIG.getItemDetailsUrl({ itemId })),
            axios.get(API_CONFIG.getItemDescriptionUrl({ itemId })),
        ]);

        const details = detailsResponse.data;
        const description = descriptionResponse.data.text;

        const item = {
            ...formatItem(details),
            sold_quantity: details['sold_quantity'],
            description,
        };

        return {
            author,
            item,
        };
    } catch(err) {
        return {
            error: err.response.data.message,
        };
    }
};

module.exports = {
    searchItems,
    getItem,
};
