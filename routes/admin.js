const express = require('express');
const Router = express.Router();
const adminController = require("../controllers/admin");


Router.get("/products", adminController.products);

Router.get("/add-product", adminController.addProduct);

module.exports = Router;
