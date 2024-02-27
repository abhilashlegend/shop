const express = require('express');
const app = express();
const shopRoutes = require("./routes/home");
const adminRoutes = require("./routes/admin");
const bodyParser = require("body-parser");
const path = require('path');
const sequelize = require('./util/database');
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/cart");
const CartItem = require('./models/cartItem');
const { error } = require('console');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch(error => {
        console.log(error);
    })
})
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: false });
//app.set('layout', 'includes', 'admin/includes');

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product); // Not necessary
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize.sync().then(result => {
    //console.log(result)
    return User.findByPk(1);
    
}).then(user => {
    if(!user){
        return User.create({ name: "Abhilash", email: "abhilashn2008@gmail.com" });
    }
    return user;
}).then(user => {
    return user.createCart();
}).then(cart => { 
    app.listen(3000);
}).catch(error => {
    console.log(error);
})

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
    res.status(404).render("error/404.ejs", {pageTitle: "Page not found" });
});


