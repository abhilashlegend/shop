const Product = require('../models/Product');
const Cart = require('../models/cart');
const { library, icon } = require('@fortawesome/fontawesome-svg-core');


exports.index = (req, res, next) => {
    Product.findAll().then(products => {
        res.render("index.ejs", { pageTitle: "Home", path: "/", products });
    });
    /*
    Product.getProducts(products => {
        res.render("index.ejs", { pageTitle: "Home", path: "/", products: products });
    })
    */
   /*
   Product.getProducts().then(([row, fieldData]) => {
    res.render("index.ejs", { pageTitle: "Home", path: "/", products: row });
   });
   */
}

exports.about = (req, res, next) => {
    res.render("about.ejs", {pageTitle: "About", path: "/about" });
}

exports.products = (req, res, next) => {
    Product.findAll().then(products => {
        res.render("all-products.ejs", { pageTitle: "All Products", path: "/products", products });
    }).catch(error => {
        console.log(error);
    })
    /*
    Product.getProducts(products => {
        res.render("all-products.ejs", { pageTitle: "All Products", path: "/products", products: products })
    })
    */
   
    /*
    Product.getProducts().then(([row, fieldData]) => {
        res.render("all-products.ejs", { pageTitle: "All Products", path: "/products", products: row })
    }).catch(error => {
        console.log(error);
    })
    */
}

exports.getProduct = (req, res, next) => {
    const id = req.params.id;
    Product.findByPk(id).then(product => {
        res.render("product-detail.ejs", { pageTitle: "Product Detail", path: "/products", product })    
    }).catch(error => {
        console.log(error);
    })
    /*
    Product.getProduct(id, (product) => {
        res.render("product-detail.ejs", { pageTitle: "Product Detail", path: "/products", product: product })
    });
    */
   /*
   Product.getProduct(id).then(([row, fieldData]) => {
    res.render("product-detail.ejs", { pageTitle: "Product Detail", path: "/products", product: row[0]})
   }).catch(error => {
    console.error(error);
   })
   */
}

exports.cart = (req, res, next) => {
    req.user.getCart().then(cart => {
            return cart.getProducts().then(products => {
                let totalPrice = 0;
                for(let product of products){
                    totalPrice = totalPrice + product.cartItem.quantity * product.price;
                    console.log("Product" + totalPrice);
                }
            res.render("cart.ejs", { pageTitle: "Cart", path: "/cart", cartProducts: products, cartTotalPrice: totalPrice });
        }).catch(error => {
            console.log(error);
        })
    }).catch(error => {
            console.log(error);
    })

    /*
    Cart.getCartProducts(cartProducts => {
        const cart = cartProducts.products;
        let products = [];
        let promises = [];
        
        for(let product of cart){
            
            let promise = new Promise((resolve, reject) => {
                */
               /*  Product.getProduct(product.id, pr => {
                    pr.quantity = product.quantity
                    products.push(pr);  
                    resolve();
               }); */
               /*
               Product.getProduct(product.id).then(([row, fieldData]) => {
                    row[0].quantity = product.quantity;
                    products.push(row[0]);
                    resolve();
               })
            });

            promises.push(promise);
            
        }
        
        Promise.all(promises).then(() => {
            
            res.render("cart.ejs", { pageTitle: "Cart", path: "/cart", cartProducts: products, cartTotalPrice: cartProducts.totalPrice });
        }).catch(error => {
            console.error('Error', error);
        });
    });
    */
}

exports.deleteCartItem = (req, res, next) => {
    const id = req.body.id;

    req.user.getCart().then(cart => {
        return cart.getProducts().then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        }).then(result => {
            res.redirect("/cart");        
        }).catch(error => {
            console.log(error);
        })
    }).catch(error => {
        console.log(error);
    });

    /*
    const productPrice = req.body.productPrice;

    Cart.deleteCartProduct(id, productPrice);
    res.redirect("/cart");
    */
}

exports.postCart = (req, res, next) => {
    const id = req.body.productId;
    let fetchedCart;
    req.user.getCart().then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: id }});
    }).then(products => {
        let product;

        if(products.length > 0){
            product = products[0];
        }

        let newQuantity = 1;

        if(product){
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return fetchedCart.addProduct(product, { through:  {quantity: newQuantity }})
        }
        return Product.findByPk(id).then(product => {
            return fetchedCart.addProduct(product, { through: { quantity: newQuantity }})
        }).catch(error => {
            console.log(error);
        })
    }).then(() => {
        res.redirect("/cart");
    }).catch(error => {
        console.log(error);
    })
    /* Product.getProduct(id, product  => {
        Cart.addProduct(id, product.price);
    }) */
   /* Product.getProduct(id).then(([product, fieldData]) => {
        Cart.addProduct(id, product.price);
    });
   
    res.redirect("/");*/
}

exports.orders = (req, res, next) => {
    res.render("orders.ejs", { pageTitle: "Orders", path: "/orders" })
}