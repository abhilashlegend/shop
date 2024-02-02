const express = require('express');
const Router = express.Router();
const adminController = require("../controllers/admin");


Router.get("/products", adminController.products);

Router.get("/add-product", adminController.addProduct);

Router.post("/admin/add-product", adminController.saveProduct);

Router.post("/update-product", adminController.updateProduct);

Router.get("/edit-product/:id", adminController.editProduct);

Router.post("/delete-product", adminController.deleteProduct);





module.exports = Router;
