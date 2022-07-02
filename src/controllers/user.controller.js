const mongoose = require('mongoose');
const Transaction = require('../models/Transaction')
const PaymentAccount = require('../models/PaymentAccount')
const Account = require('../models/Account')
const Order = require('../models/Order')
const Package = require('../models/Package')
const Product = require('../models/Product')
const LogManager = require('../models/LogManager')

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
            const managementHistory = await LogManager.find({
                userId: Number(userId)
            }).lean();
            if(managementHistory.length === 0) {
                managementHistory = [];
            }
            res.render("layouts/user/managementHistory", {
                layout: "user/main",
                managementHistory
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
            const ordersOfUser = await Order.find({ user: Number(userId) }).lean();
            for (let i = 0; i < ordersOfUser.length; i++) {
                const order = ordersOfUser[i];
                const package = await Package.findById(order.item).lean();
                order.package = package;
                ordersOfUser[i] = order;
            }
            res.render("layouts/user/paymentHistory", {
                layout: "user/main",
                ordersOfUser,
                userId
            });
        } catch (error) {
            res.status(500).json({
                status: "Server Error",
                message: error?.message || 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            });
        }
    },
    getOrderOfPaymentHistory: async (req, res) => {
        try {
            // push breadcrumb for this page
            let userId = (req.params.userId);
            let orderId = (req.params.orderId);
            res.locals.hyperlinks = hyperlinksSidebarUser(userId);
            res.locals.userId = userId;
            res.locals.breadCrumb = pushBreadCrumb("Lịch sử mua hàng", `/user/${userId}/myPaymentHistory`);
            const order = await Order.findById(orderId).lean();
            for (let i = 0; i < order.detail.length; i++) {
                const pId =  order.detail[i].product;
                const product = await Product.findById(pId).lean();
                order.detail[i].product = product;
            }            
            res.render("layouts/user/detailOrder", {
                layout: "user/main",
                order
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
            let correspondingAccount = await Account.findById(userId);
            if (!correspondingAccount) {
                res.redirect('layouts/error/404');
            }
            console.log(correspondingAccount);
            res.render("layouts/user/account", {
                layout: "user/main",
                account: correspondingAccount.toObject()
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
