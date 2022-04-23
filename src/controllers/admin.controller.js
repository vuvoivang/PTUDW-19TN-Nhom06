module.exports = {
    get: (req, res) => {
        res.render("layouts/admin/managePatient", {
            layout: "admin/main"
        });
    },
    createAccount: (req, res) => {
        res.render("layouts/admin/managerCreate", {
            layout: "admin/main",
            adminSidebar: "partials/adminSidebar",
            adminNavbar: "partials/adminNavbar"
        });
    }
}
