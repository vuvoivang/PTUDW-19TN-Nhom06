const MinimumTransfer = require("../../models/MinimumTransfer");
const PaymentAccount = require('../../models/PaymentAccount')
const Account = require('../../models/Account')

const path = "layouts/manager";

module.exports = {
    getPaymentManagement: async (req, res) => {
        let data = await MinimumTransfer.findOne({
            type: "main",
        });
        let debtors = await PaymentAccount.find({ balance: {$lt: 0} }).lean();
        for (let i = 0; i < debtors.length; i++) {
            let info = await Account.findById(debtors[i].paymentAccountId).lean();
            debtors[i].info = info;
        }
        console.log(debtors);
        res.render(`${path}/paymentManagement`, {
            layout: "manager/main",
            tag: "payment",
            value: data.value,
            debtors
        })
    }
}