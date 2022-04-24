module.exports = {
    getAccountPayment: (req, res) => {
        res.render("layouts/user/accountPayment", {
            layout: "user/main"
        });
    }
}
