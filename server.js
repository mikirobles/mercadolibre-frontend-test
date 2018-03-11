const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
    dev: process.env.NODE_ENV !== 'production' && !process.env.NOW,
});
const handle = app.getRequestHandler();

const { getItem, searchItems } = require('./helpers/api');

app.prepare().then(() => {
    const server = express();

    server.get('/api/items', async (req, res) => {
        res.json(
            await searchItems({ query: req.query['q'] ? req.query['q'] : '' }),
        );
    });

    server.get('/api/items/:id', async (req, res) => {
        res.json(await getItem({ itemId: req.params.id }));
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
