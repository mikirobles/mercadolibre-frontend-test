const axios = require('axios');

const author = {
    name: 'Micael',
    lastname: 'Robles',
};

const getLongest = (...args) =>
    args.reduce((a, b) => {
        return String(a).length > String(b).length ? a : b;
    });

const getSearchItemsUrl = ({ query }) =>
    `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURI(query)}`;
const getItemDetailsUrl = ({ itemId }) =>
    `https://api.mercadolibre.com/items/${itemId}`;
const getItemDescriptionUrl = ({ itemId }) =>
    `https://api.mercadolibre.com/items/${itemId}/description`;

const flatten = arr => [].concat.apply([], arr);

const formatItem = rawData => ({
    id: rawData.id,
    title: rawData.title,
    price: {
        currency: rawData['currency_id'],
        amount: rawData.price,
        decimals:
            String(rawData.price).split('.').length === 2
                ? Number(String(rawData.price).split('.')[1])
                : 0,
    },
    picture: rawData.thumbnail,
    condition: rawData.condition,
    free_shipping: rawData.shipping['free_shipping'],
});

const searchItems = async ({ query }) => {
    try {
        const resultsData = (await axios.get(getSearchItemsUrl({ query })))
            .data;

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
            axios.get(getItemDetailsUrl({ itemId })),
            axios.get(getItemDescriptionUrl({ itemId })),
        ]);

        const details = detailsResponse.data;
        const description = getLongest(descriptionResponse.data.text, descriptionResponse.data['plain_text']);
        const item = {
            ...formatItem(details),
            picture: details.pictures[0] ? details.pictures[0].url : '',
            sold_quantity: details['sold_quantity'],
            description,
        };

        return {
            author,
            item,
        };
    } catch (err) {
        return {
            error: err.response.data.message,
        };
    }
};

module.exports = {
    searchItems,
    getItem,
};
