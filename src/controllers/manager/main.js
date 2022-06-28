const patient = require("./patient.controller");
const category = require("./category.controller");
const product = require("./product.controller");
const package = require("./package.controller");
const payment = require("./payment.controller");

module.exports = {
    get: (req, res) => {
        res.redirect('/manager/patient-management');
    },
    patient,
    category,
    product,
    package,
    payment
}
