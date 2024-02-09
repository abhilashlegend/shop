const Product = require("../models/Product");

exports.products = (req, res, next) => {
    /* Product.getProducts((products) => {
        res.render("./admin/products.ejs",{pageTitle: "Admin Products Page", products: products})
    }) */

    Product.getProducts().then(([row, fieldData]) => {
        res.render("./admin/products.ejs",{pageTitle: "Admin Products Page", products: row})
    })
}

exports.addProduct = (req, res, next) => {
    res.render("./admin/add-product.ejs", {pageTitle: "Admin Add Product Page"})
}

exports.saveProduct = (req, res, next) => {
    const product = new Product(req.body.product, req.body.imageurl, req.body.description, req.body.quantity, req.body.price);
    product.saveProduct().then(() => {
        res.redirect("/admin/products");
    }).catch(error => {
        console.error(error);
    });
}

exports.editProduct = (req, res, next) => {
    const productId = req.params.id;
    Product.getProduct(productId, product => {
        res.render("./admin/edit-product.ejs", {pageTitle: "Admin Edit Product Page", product: product });
    })
}

exports.updateProduct = (req, res, next) => {
    const updatedProduct = new Product(req.body.product, req.body.imageurl, req.body.description, req.body.quantity, req.body.price);

    updatedProduct.updateProduct(req.body.id);

    res.redirect("/admin/products");
}

exports.deleteProduct = (req, res, next) => {
    Product.deleteProduct(req.body.id);
    res.redirect("/admin/products");   
}