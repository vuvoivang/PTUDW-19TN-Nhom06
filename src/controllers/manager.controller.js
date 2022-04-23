module.exports = {
    get: (req, res) => {
        res.render("layouts/manager/main");
    },

    getProductManagement: (req, res) => {
        res.render("layouts/manager/productManagement", {
            layout: "manager/main"
        })
    },

    createProduct: (req, res) => {
        res.render("layouts/manager/createProduct", {
            layout: "manager/main"
        })
    }
}
