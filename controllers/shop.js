const Product = require('../models/Product');
const Cart = require('../models/cart');

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

exports.getProduct = (req, res, next) => {
    const id = req.params.id;
    Product.getProduct(id, (product) => {
        res.render("product-detail.ejs", { pageTitle: "Product Detail", path: "/products", product: product })
    });
}

exports.cart = (req, res, next) => {
    res.render("cart.ejs", { pageTitle: "Cart", path: "/cart" })
}

exports.postCart = (req, res, next) => {
    const id = req.body.productId;
    Product.getProduct(id, product  => {
        Cart.addProduct(id, product.price);
    })
   
    res.redirect("/");
}

exports.orders = (req, res, next) => {
    res.render("orders.ejs", { pageTitle: "Orders", path: "/orders" })
}