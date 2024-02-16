const express = require('express');
const app = express();
const shopRoutes = require("./routes/home");
const adminRoutes = require("./routes/admin");
const bodyParser = require("body-parser");
const path = require('path');
const sequelize = require('./util/database');
const { error } = require('console');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: false });
//app.set('layout', 'includes', 'admin/includes');

sequelize.sync().then(result => {
    //console.log(result)
}).catch(error => {
    console.log(error);
})

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
    res.status(404).render("error/404.ejs", {pageTitle: "Page not found" });
});


app.listen(3000);