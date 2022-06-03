const { categories, products, packages } = require('../models/manager.model');
const path = "layouts/manager";


module.exports = {
    get: (req, res) => {
        res.render(`${path}/main`, {
            main: true,
            tag: "patient"
        });
    },

    // patient
    getPatientManagement: (req, res) => {
        res.render(`${path}/patientManagement`, {
            layout: "manager/main",
            tag: "patient"
        });
    },

    // category
    getCategoryManagement: (req, res) => {
        res.render(`${path}/categoryManagement`, {
            layout: "manager/main",
            tag: "category",
            categories
        })
    },

    // product
    getProductManagement: (req, res) => {
        res.render(`${path}/productManagement`, {
            layout: "manager/main",
            tag: "product",
            products
        })
    },

    addProduct: (req, res) => {
        res.render(`${path}/addProduct`, {
            layout: "manager/main",
            tag: "product"
        })
    },

    detailProduct: (req, res) => {
        res.render(`${path}/detailProduct`, {
            layout: "manager/main",
            tag: "product"
        })
    },

    // package
    getPackageManagement: (req, res) => {
        res.render(`${path}/packageManagement`, {
            layout: "manager/main",
            tag: "package",
            packages
        })
    },

    addPackage: (req, res) => {
        res.render(`${path}/addPackage`, {
            layout: "manager/main",
            tag: "package"
        })
    },

    detailPackage: (req, res) => {
        res.render(`${path}/detailPackage`, {
            layout: "manager/main",
            tag: "package"
        })
    },

    // payment
    getPaymentManagement: (req, res) => {
        res.render(`${path}/paymentManagement`, {
            layout: "manager/main",
            tag: "payment"
        })
    }
}
