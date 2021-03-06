const axios = require('axios');

const author = {
    name: 'Micael',
    lastname: 'Robles'
};

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
                : 0
    },
    picture: rawData.thumbnail,
    condition: rawData.condition,
    free_shipping: rawData.shipping['free_shipping']
});

const searchItems = async ({ query }) => {
    try {
        const resultsData = (await axios.get(getSearchItemsUrl({ query })))
            .data;

        let categories = [];
        const categoryObj = resultsData.filters.find(
            filter => filter.id === 'category'
        );
        if (categoryObj) {
            categories = flatten(
                categoryObj.values.map(category =>
                    category['path_from_root'].map(
                        rootCategory => rootCategory.name
                    )
                )
            );
        }
        const items = resultsData.results.slice(0, 4).map(formatItem);

        return {
            author,
            categories,
            items
        };
    } catch (err) {
        console.error(err);
        return {
            error: err
        };
    }
};

const getItem = async ({ itemId }) => {
    try {
        const details = (await axios.get(getItemDetailsUrl({ itemId }))).data;
        let descriptionData;

        await axios
            .get(getItemDescriptionUrl({ itemId }))
            .then(response => {
                descriptionData = response.data;
            })
            .catch(console.error);

        const categoriesResponse = await axios.get(
            `https://api.mercadolibre.com/categories/${details['category_id']}`
        );
        const categories = categoriesResponse.data['path_from_root'].map(
            category => category.name
        );

        const description = descriptionData
            ? descriptionData['plain_text'] ||
              descriptionData.text
            : null;

        const item = {
            ...formatItem(details),
            picture: details.pictures[0] ? details.pictures[0].url : '',
            sold_quantity: details['sold_quantity'],
            description,
            categories
        };

        return {
            author,
            item
        };
    } catch (err) {
        return {
            error: err.response ? err.response.data.message : err
        };
    }
};

module.exports = {
    searchItems,
    getItem
};
