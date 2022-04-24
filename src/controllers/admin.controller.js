module.exports = {
    get: (req, res) => {
        res.render("layouts/admin/managerCreate", {
            layout: "admin/main"
        });
    },
    createAccount: (req,res) => {
        res.render("layouts/admin/managerCreate", {
            layout: "admin/main"
        });
    }
}
