module.exports = {
    get: (req, res) => {
        res.render("layouts/sites/productPayment", {
            layout: "sites/main",
        });
    },
};