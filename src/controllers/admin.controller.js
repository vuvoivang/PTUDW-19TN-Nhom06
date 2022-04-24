module.exports = {
    get: (req, res) => {
        res.render("layouts/admin/managePatient", {
            layout: "admin/main"
        });
    }
}
