const path = "layouts/manager";
const Account = require('../../models/Account');
const utils = require('../../utils/functions');

module.exports = {
    // get All Accounts with role user
    getPatientManagement: async (req, res) => {
        try {
            let patients = await Account.find({ role: "user" });
            patients = utils.mapObjectInArray(patients);
            res.render(`${path}/patientManagement`, {
                layout: "manager/main",
                tag: "patient",
                patients,
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    getAddPatient: async (req, res) => {
        res.render(`${path}/addPatient`, {
            layout: "manager/main",
            tag: "patient"
        });
    },

    addPatient: async (req, res) => {

    },

    detailPatient: async (req, res) => {
        res.render(`${path}/detailPatient`, {
            layout: "manager/main",
            tag: "patient"
        })
    },

    historyPatient: async (req, res) => {
        res.render(`${path}/historyPatient`, {
            layout: "manager/main",
            tag: "patient"
        })
    },

    updatePatient: async (req, res) => {

    },

    deletePatient: async (req, res) => {

    },

}