module.exports = {
    get: (req, res) => {
        res.render("layouts/user/accountPayment", {
            layout: "user/main"
        });
    }
}
