const path = "layouts/manager";

module.exports = {
    getPaymentManagement: (req, res) => {
        res.render(`${path}/paymentManagement`, {
            layout: "manager/main",
            tag: "payment"
        })
    }
}