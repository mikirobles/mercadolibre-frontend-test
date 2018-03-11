const express = require("express")
const items = require("./items")
const routes = express.Router();

// ROUTES
routes.use('/items', items)

module.exports = routes;