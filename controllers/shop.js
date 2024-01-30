
exports.index = (req, res, next) => {
    res.render("index.ejs", { pageTitle: "Home", path: "/" });
}

exports.about = (req, res, next) => {
    res.render("about.ejs", {pageTitle: "About", path: "/about" });
}

exports.products = (req, res, next) => {
    res.render("all-products.ejs", { pageTitle: "All Products", path: "/products" })
}

exports.cart = (req, res, next) => {
    res.render("cart.ejs", { pageTitle: "Cart", path: "/cart" })
}

exports.orders = (req, res, next) => {
    res.render("orders.ejs", { pageTitle: "Orders", path: "/orders" })
}