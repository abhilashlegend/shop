const Product = require("../models/Product");

exports.products = (req, res, next) => {
    Product.getProducts((products) => {
        res.render("./admin/products.ejs",{pageTitle: "Admin Products Page", products: products})
    })
}

exports.addProduct = (req, res, next) => {
    res.render("./admin/add-product.ejs", {pageTitle: "Admin Add Product Page"})
}

exports.saveProduct = (req, res, next) => {
    const product = new Product(req.body.product, req.body.imageurl, req.body.description, req.body.price);
    product.saveProduct();
    res.redirect("/admin/products");
}