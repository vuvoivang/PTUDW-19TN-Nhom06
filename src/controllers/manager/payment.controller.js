const MinimumTransfer = require("../../models/MinimumTransfer");
const { hyperlinksSidebarManager, managerBreadCrumb } = require('../../constants/index');
const debtController = require('../../controllers/debt.controller');
const jwt = require('jsonwebtoken');
const Account = require('../../models/Account');

const pushBreadCrumb = (label, link, isActive = true) => {
    let thisBreadCrumb = {};
    Object.assign(thisBreadCrumb, managerBreadCrumb);
    thisBreadCrumb.path = [...managerBreadCrumb.path];
    thisBreadCrumb.path.push({
        label,
        link,
        isActive
    })
    thisBreadCrumb.mainLabel = label;
    return thisBreadCrumb;
};

const path = "layouts/manager";

module.exports = {
    getPaymentManagement: async (req, res) => {
        let data = await MinimumTransfer.findOne({
            type: "main",
        });
        res.locals.hyperlinks = hyperlinksSidebarManager('payment-management');
        res.locals.breadCrumb = pushBreadCrumb("Quản lý thanh toán", '/manager/payment-management');
        const decoded = await jwt.decode(req.cookies.token, { complete: true });
        const id = decoded.payload.id;
        const user = await Account.findById(id).lean();
        let debts = await debtController.getDebts();
        res.render(`${path}/paymentManagement`, {
            layout: "manager/main",
            tag: "payment",
            user,
            debts,
            value: data.value
        });
    }
}