const { categories, products } = require('../models/manager.model');
const path = "layouts/manager";


module.exports = {
    get: (req, res) => {
        res.render(`${path}/main`);
    },
    // patient
    getPatientManagement: (req, res) => {
        res.render(`${path}/patientManagement`, {
            layout: "manager/main"
        });
    },

    // category
    getCategoryManagement: (req, res) => {
        res.render(`${path}/categoryManagement`, {
            layout: "manager/main",
            categories
        })
    },
    // product
    getProductManagement: (req, res) => {
        res.render(`${path}/productManagement`, {
            layout: "manager/main",
            products
        })
    },

    addProduct: (req, res) => {
        res.render(`${path}/addProduct`, {
            layout: "manager/main"
        })
    },

    detailProduct: (req, res) => {
        res.render(`${path}/detailProduct`, {
            layout: "manager/main"
        })
    },

    // package
    getPackageManagement: (req, res) => {
        res.render(`${path}/packageManagement`, {
            layout: "manager/main"
        })
    },

    // payment
    getPaymentManagement: (req, res) => {
        res.render(`${path}/paymentManagement`, {
            layout: "manager/main"
        })
    }
}
