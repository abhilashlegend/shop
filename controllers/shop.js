
exports.index = (req, res, next) => {
    res.render("index.ejs", { pageTitle: "Home Page" });
}