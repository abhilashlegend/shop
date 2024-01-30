const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

module.exports = class Product {
    constructor(product, imageUrl, description, price){
        this.product = product;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    saveProduct(){
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

    static getProducts(cb) {
        fs.readFile(p, (err, fileContent) => {           
            if(!err){
                return cb(JSON.parse(fileContent));
            }
            return cb([]);
        })
    }

    
}