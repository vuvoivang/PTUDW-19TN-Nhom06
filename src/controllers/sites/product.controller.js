module.exports = {
    get: (req, res) => {
        res.render("layouts/sites/product", {
            layout: "sites/main",
        });
    },
};