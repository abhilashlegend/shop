const express = require('express');
const Router = express.Router();
const adminController = require("../controllers/admin");


Router.get("/products", adminController.products);

Router.get("/add-product", adminController.addProduct);

Router.post("/admin/add-product", adminController.saveProduct);

Router.get("/edit-product", adminController.editProduct);

module.exports = Router;
