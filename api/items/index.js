const express = require('express');
const routes = express.Router();

const {
    getItem,
    searchItems
} = require('./helpers')

// ENDPOINTS
routes.get('/', async (req, res) => {
    res.json(
        await searchItems({ query: req.query['q'] ? req.query['q'] : '' }),
    );
});

routes.get('/:id', async (req, res) => {
    res.json(await getItem({ itemId: req.params.id }));
});

module.exports = routes;
