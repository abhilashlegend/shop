const express = require('express');
const app = express();
const shopRoutes = require("./routes/home");
const bodyParser = require("body-parser");
const path = require('path');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));




app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render("error/404.ejs", {pageTitle: "Page not found" });
});


app.listen(3000);