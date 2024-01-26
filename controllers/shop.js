
exports.index = (req, res, next) => {
    res.render("index.ejs", { pageTitle: "Home Page", path: "/" });
}

exports.about = (req, res, next) => {
    res.render("about.ejs", {pageTitle: "About Page", path: "/about" });
}