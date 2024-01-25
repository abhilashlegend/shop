const express = require('express');
const Router = express.Router();
const shopController = require('../controllers/shop');

Router.get("/", shopController.index);

module.exports = Router;




