const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
    dev: process.env.NODE_ENV !== 'production' && !process.env.NOW,
});
const handle = app.getRequestHandler();
const api = require('./api');

app.prepare().then(() => {
    const server = express();

    server.use(
        express.static('/static/images', {
            maxage: '3600000',
        }),
    );

    server.use('/api', api);

    server.get('/items', (req, res) => {
        if (req.query.search) {
            return app.render(req, res, '/search');
        } else {
            next();
        }
    });

    server.get('/items/:id', (req, res) => {
        return app.render(req, res, '/item');
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
