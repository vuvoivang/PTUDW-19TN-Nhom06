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
    getManagementHistory: async (req, res) => {
        try {
            // push breadcrumb for this page
            let userId = (req.params.userId);
            res.locals.hyperlinks = hyperlinksSidebarUser(userId);
            res.locals.userId = userId;
            res.locals.breadCrumb = pushBreadCrumb("Lịch sử được quản lý", `/user/${userId}/myManagementHistory`);

            res.render("layouts/user/managementHistory", {
                layout: "user/main",

            });
        } catch (error) {
            res.status(500).json({
                status: "Server Error",
                message: error?.message || 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            });
        }
    },
    getPaymentHistory: async (req, res) => {
        try {
            // push breadcrumb for this page
            let userId = (req.params.userId);
            res.locals.hyperlinks = hyperlinksSidebarUser(userId);
            res.locals.userId = userId;
            res.locals.breadCrumb = pushBreadCrumb("Lịch sử mua hàng", `/user/${userId}/myPaymentHistory`);

            res.render("layouts/user/paymentHistory", {
                layout: "user/main",

            });
        } catch (error) {
            res.status(500).json({
                status: "Server Error",
                message: error?.message || 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            });
        }
    },
    getAccountInfo: async (req, res) => {
        try {
            // push breadcrumb for this page
            let userId = (req.params.userId);
            res.locals.hyperlinks = hyperlinksSidebarUser(userId);
            res.locals.userId = userId;
            res.locals.breadCrumb = pushBreadCrumb("Tài khoản của tôi", `/user/${userId}/account`);

            res.render("layouts/user/account", {
                layout: "user/main",

            });
        } catch (error) {
            res.status(500).json({
                status: "Server Error",
                message: error?.message || 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            });
        }
    },
    getAccountPayment: async (req, res) => {
        try {
            // push breadcrumb for this page
            let userId = (req.params.userId);
            res.locals.hyperlinks = hyperlinksSidebarUser(userId);
            res.locals.userId = userId;
            res.locals.breadCrumb = pushBreadCrumb("Tài khoản thanh toán", `/user/${userId}/accountPayment`);
            let paymentAccount = await PaymentAccount.findOne({
                paymentAccountId: userId,
            });
            if (paymentAccount) {
                let transactions = await Transaction.find({
                    accountId: paymentAccount._id
                })
                res.locals.paymentAccount = paymentAccount.toObject();
                res.locals.transactions = transactions.map(item => {
                    return {
                        ...item.toObject(), localeDate: item.createdAt.toLocaleString()
                    }
                });
            }
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
