module.exports = {
    get: (req, res) => {
        res.render("layouts/user/accountInfo", {
            layout: "user/main"
        });
    }
}
