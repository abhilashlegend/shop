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
    Cart.getCartProducts(cartProducts => {
        const cart = cartProducts.products;
        let products = [];
        let promises = [];
        
        for(let product of cart){
            
            let promise = new Promise((resolve, reject) => {
                Product.getProduct(product.id, pr => {
                    pr.quantity = product.quantity
                    products.push(pr);  
                    resolve();
               });
            });

            promises.push(promise);
            
        }
        
        Promise.all(promises).then(() => {
            res.render("cart.ejs", { pageTitle: "Cart", path: "/cart", cartProducts: products, cartTotalPrice: cartProducts.totalPrice });
        }).catch(error => {
            console.error('Error', error);
        })

       
    })
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