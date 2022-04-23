module.exports = {
    get: (req, res) => {
        res.render("layouts/sites/home", {
            layout: "sites/main",
        });
    },
};
