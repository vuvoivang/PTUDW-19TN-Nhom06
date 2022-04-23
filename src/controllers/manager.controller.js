module.exports = {
    get: (req, res) => {
        res.render("layouts/manager/main");
    },
    // patient
    getPatientManagement: (req, res) => {
        res.render("layouts/manager/patientManagement", {
            layout: "manager/main"
        });
    },

    // category
    getCategoryManagement: (req, res) => {
        res.render("layouts/manager/categoryManagement", {
            layout: "manager/main"
        })
    },
    // product
    getProductManagement: (req, res) => {
        res.render("layouts/manager/productManagement", {
            layout: "manager/main"
        })
    },

    addProduct: (req, res) => {
        res.render("layouts/manager/addProduct", {
            layout: "manager/main"
        })
    },

    detailProduct: (req, res) => {
        res.render("layouts/manager/detailProduct", {
            layout: "manager/main"
        })
    },

    // package
    getPackageManagement: (req, res) => {
        res.render("layouts/manager/packageManagement", {
            layout: "manager/main"
        })
    },

    // payment
    getPaymentManagement: (req, res) => {
        res.render("layouts/manager/paymentManagement", {
            layout: "manager/main"
        })
    }
}
