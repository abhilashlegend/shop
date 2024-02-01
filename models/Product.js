const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const  { v1: uuidv1 } = require('uuid');
const { getProduct } = require('../controllers/shop');

module.exports = class Product {
    constructor(product, imageUrl, description, quantity, price){
        this.product = product;
        this.imageUrl = imageUrl;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
    }

    saveProduct(){
        this.id = uuidv1();
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if(!err){
                products = JSON.parse(fileContent);
            }
            products.push(this);

            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            })
        })
    }

    updateProduct(id) {
        let product = null;
        this.constructor.getProduct(id, product => {
            if(product){
                const updatedProduct = {
                    id: id,
                    product,
                    ...this
                }
                fs.readFile(p, (err, fileContent) => {
                    let products = [];
                    if(!err){
                        products = JSON.parse(fileContent);
                        const productIndex = products.findIndex(product => product.id === id);
                        products[productIndex] = updatedProduct;

                        fs.writeFile(p, JSON.stringify(products), err => {
                            console.log(err);
                        })
                    }     
                })
            }
        })
        
        
        
    }

    static getProducts(cb) {
        fs.readFile(p, (err, fileContent) => {           
            if(!err){
                return cb(JSON.parse(fileContent));
            }
            return cb([]);
        })
    }

    static getProduct(id, cb) {
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if(!err){
                products = JSON.parse(fileContent);
                const product = products.find(product => product.id === id);
                return cb(product); 
            }
            return cb(null);
        })
    }

    
}