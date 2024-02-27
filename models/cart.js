const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
});

module.exports = Cart;

/*const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {

    static getCartProducts(cb) {
        fs.readFile(p, (err, fileContent) => {
            let cartProducts = [];
            if(!err){
                cartProducts = JSON.parse(fileContent);
                cb(cartProducts);
            } else {
                cb(cartProducts);
            }
        })
    }

    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if(!err){
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            
            if(existingProduct){
                updatedProduct = { ...existingProduct };
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: id, quantity: 1 };
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        });
    }

    static deleteCartProduct(id, productPrice) {
        
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return;
            }
            let cart = { ...JSON.parse(fileContent) }

            let cartProducts = cart.products;

            let updatedProduct = cartProducts.filter(prod => prod.id !== id);
            const product = cartProducts.find(prod => prod.id === id);
            const updatedPrice = cart.totalPrice - product.quantity * productPrice;
            const updatedCart = {
                products: [...updatedProduct],
                totalPrice: updatedPrice
            }
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })
    }
}
*/