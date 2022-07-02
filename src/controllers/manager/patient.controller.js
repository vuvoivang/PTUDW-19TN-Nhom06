const path = "layouts/manager";

module.exports = {
    getPatientManagement: (req, res) => {
        res.render(`${path}/patientManagement`, {
            layout: "manager/main",
            tag: "patient"
        });
    },
}