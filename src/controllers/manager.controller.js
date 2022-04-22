module.exports = {
    get: (req, res) => {
        res.render("layouts/manager/main");
    },

    getProductManagement: (req, res) => {
        res.render("layouts/manager/productManagement")
    },

    createProduct: (req, res) => {
        res.render("layouts/manager/createProduct")
    }
}
