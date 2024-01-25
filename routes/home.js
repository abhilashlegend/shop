const express = require('express');
const Router = express.Router();
const shopController = require('../controllers/shop');

Router.get("/", shopController.index);

Router.get("/about", shopController.about);

module.exports = Router;




