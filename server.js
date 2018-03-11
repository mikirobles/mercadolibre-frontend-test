const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
    dev: process.env.NODE_ENV !== 'production' && !process.env.NOW,
});
const handle = app.getRequestHandler();
const api = require("./api")

app.prepare().then(() => {
    const server = express();

    server.use('/api', api);

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
