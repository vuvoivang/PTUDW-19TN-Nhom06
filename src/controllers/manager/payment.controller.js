const MinimumTransfer = require("../../models/MinimumTransfer");

const path = "layouts/manager";

module.exports = {
    getPaymentManagement: async (req, res) => {
        let data = await MinimumTransfer.findOne({
            type: "main",
        });
        res.render(`${path}/paymentManagement`, {
            layout: "manager/main",
            tag: "payment",
            value: data.value,
        })
    }
}