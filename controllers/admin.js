

exports.products = (req, res, next) => {
    res.render("./admin/products.ejs",{pageTitle: "Admin Products Page"})
}

exports.addProduct = (req, res, next) => {
    res.render("./admin/add-product.ejs", {pageTitle: "Admin Add Product Page"})
}