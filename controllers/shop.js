
exports.index = (req, res, next) => {
    res.render("index.ejs", { pageTitle: "Home Page" });
}

exports.about = (req, res, next) => {
    res.render("about.ejs", {pageTitle: "About Page" });
}