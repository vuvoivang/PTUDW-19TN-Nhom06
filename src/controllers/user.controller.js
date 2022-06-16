const mongoose = require('mongoose');
const Transaction = require('../models/Transaction')
const PaymentAccount = require('../models/PaymentAccount')

const { hyperlinksSidebarUser, userBreadCrumb } = require('../constants/index');
const pushBreadCrumb = (label, link, isActive = true) => {
    let thisBreadCrumb = {};
    Object.assign(thisBreadCrumb, userBreadCrumb);
    thisBreadCrumb.path = [...userBreadCrumb.path];
    thisBreadCrumb.path.push({
        label,
        link,
        isActive
    })
    thisBreadCrumb.mainLabel = label;
    return thisBreadCrumb;
}
module.exports = {
    getAccountPayment: async (req, res) => {
        try {
            res.locals.hyperlinks = hyperlinksSidebarUser;
            // push breadcrumb for this page
            let userId = (req.params.userId);
            res.locals.userId = userId;
            res.locals.breadCrumb = pushBreadCrumb("Tài khoản thanh toán", `/user/${userId}/accountPayment`);
            let paymentAccount = await PaymentAccount.findOne({
                paymentAccountId: userId,
            });
            let transactions = await Transaction.find({
                accountId: paymentAccount._id
            })
            res.locals.paymentAccount = paymentAccount.toObject();
            console.log(transactions)
            res.locals.transactions = transactions.map(item => {
                return {
                    ...item.toObject(), localeDate: item.createdAt.toLocaleString()
                }
            });
            res.render("layouts/user/accountPayment", {
                layout: "user/main",
                isHaveAccountPayment: paymentAccount ? true : false,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "Server Error",
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            });
        }
    }
}
