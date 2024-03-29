const express = require('express');
const Router = express.Router();
const shopController = require('../controllers/shop');

Router.get("/", shopController.index);

Router.get("/about", shopController.about);

Router.get("/products", shopController.products);

Router.get("/products/:id", shopController.getProduct)

Router.get("/cart", shopController.cart);

Router.post("/cart", shopController.postCart);

Router.get("/orders", shopController.orders);

Router.post("/create-order", shopController.postOrder);

Router.post("/delete-cart-item", shopController.deleteCartItem);

module.exports = Router;




