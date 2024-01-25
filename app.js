const express = require('express');
const app = express();
const shopRoutes = require("./routes/home");
const bodyParser = require("body-parser");


app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render("error/404.ejs", {pageTitle: "Page not found" });
});


app.listen(3000);