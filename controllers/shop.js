const Product = require('../models/Product');

exports.index = (req, res, next) => {
    Product.getProducts(products => {
        res.render("index.ejs", { pageTitle: "Home", path: "/", products: products });
    })
}

exports.about = (req, res, next) => {
    res.render("about.ejs", {pageTitle: "About", path: "/about" });
}

exports.products = (req, res, next) => {
    Product.getProducts(products => {
        res.render("all-products.ejs", { pageTitle: "All Products", path: "/products", products: products })
    })
    
}

exports.cart = (req, res, next) => {
    res.render("cart.ejs", { pageTitle: "Cart", path: "/cart" })
}

exports.orders = (req, res, next) => {
    res.render("orders.ejs", { pageTitle: "Orders", path: "/orders" })
}