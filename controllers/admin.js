const { error } = require("jquery");
const Product = require("../models/Product");

exports.products = (req, res, next) => {
    /* Product.getProducts((products) => {
        res.render("./admin/products.ejs",{pageTitle: "Admin Products Page", products: products})
    }) */

    req.user.getProducts().then(products => {
        res.render("./admin/products.ejs",{pageTitle: "Admin Products Page", products: products});    
    }).catch(error => {
        console.log(error);
    })

    /*
    Product.findAll().then(products => {
        res.render("./admin/products.ejs",{pageTitle: "Admin Products Page", products: products});
    }).catch(error => {
        console.log(error);
    })
    */
    /*
    Product.getProducts().then(([row, fieldData]) => {
        res.render("./admin/products.ejs",{pageTitle: "Admin Products Page", products: row})
    })
    */
}

exports.addProduct = (req, res, next) => {
    res.render("./admin/add-product.ejs", {pageTitle: "Admin Add Product Page"})
}

exports.saveProduct = (req, res, next) => {
    const title = req.body.product;
    const imageUrl = req.body.imageurl;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const description = req.body.description;
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        quantity: quantity
    }) /*
    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        quantity: quantity,
        userId: req.user.id
    })*/.then(result => {
        console.log("Product created");
        res.redirect("/admin/products");
    }).catch(error => {
        console.log("Error: " + error);
    });
    
    /*
    const product = new Product(req.body.product, req.body.imageurl, req.body.description, req.body.quantity, req.body.price);
    product.saveProduct().then(() => {
        res.redirect("/admin/products");
    }).catch(error => {
        console.error(error);
    });
    */
}

exports.editProduct = (req, res, next) => {
    const productId = req.params.id;
    Product.findAll({where: {id: productId }}).then(products => {
        res.render("./admin/edit-product.ejs", {pageTitle: "Admin Edit Product Page", product: products[0] });
    }).catch(error => {
        console.log(error);
    });
    /*
    Product.getProduct(productId, product => {
        res.render("./admin/edit-product.ejs", {pageTitle: "Admin Edit Product Page", product: product });
    })
    */
}

exports.updateProduct = (req, res, next) => {
    const productId = req.body.id;
    const title = req.body.product;
    const imageUrl = req.body.imageurl;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const description = req.body.description;

    Product.findByPk(productId).then(product => {
        product.title = title;
        product.imageUrl = imageUrl;
        product.price = price;
        product.quantity = quantity;
        product.description = description;
        return product.save();
    }).then(result => {
        console.log("Product updated");
        res.redirect("/admin/products");
    }).catch(error => {
        console.log(error);
    })
    /*
    const updatedProduct = new Product(req.body.product, req.body.imageurl, req.body.description, req.body.quantity, req.body.price);

    updatedProduct.updateProduct(req.body.id);

    res.redirect("/admin/products");
    */
}

exports.deleteProduct = (req, res, next) => {
    Product.findByPk(req.body.id).then(product => {
        return product.destroy();
    }).then(result => {
        console.log("Product deleted");
        res.redirect("/admin/products");   
    }).catch(error => {
        console.log("Error: " + error);
    })
  //  Product.deleteProduct(req.body.id);
    
}