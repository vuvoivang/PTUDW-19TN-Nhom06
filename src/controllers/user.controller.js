const mongoose = require('mongoose');
const Transaction = require('../models/Transaction')
const PaymentAccount = require('../models/PaymentAccount')
const Account = require('../models/Account')
const Order = require('../models/Order')
const Package = require('../models/Package')
const Product = require('../models/Product')
const LogManager = require('../models/LogManager')
const bcrypt = require('bcryptjs');
const announceController = require('../controllers/announce.controller');

const jwt = require('jsonwebtoken')
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
};

module.exports = {
    getManagementHistory: async (req, res) => {
        try {
            // push breadcrumb for this page
            const decoded = await jwt.decode(req.cookies.token, { complete: true });
            let userId = decoded.payload.id;
            const user = await Account.findById(userId).lean();

            res.locals.hyperlinks = hyperlinksSidebarUser( 'myManagementHistory');
            res.locals.userId = userId;
            res.locals.breadCrumb = pushBreadCrumb("Lịch sử được quản lý", `/user/${userId}/myManagementHistory`);

            let announces = await announceController.getAnnounceById(userId);
            // for (let i = 0; i< announces.length; i++) {
            //     announces[i]['time'] = announceController.formatTime(announces[i].createdAt);
            // }
            console.log(announces);

            let managementHistory = await LogManager.find({
                userId: Number(userId)
            }).lean();
            if (managementHistory.length === 0) {
                managementHistory = [];
            }
            res.render("layouts/user/managementHistory", {
                layout: "user/main",
                managementHistory,
                user,
                announces
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
            const decoded = await jwt.decode(req.cookies.token, { complete: true });
            let userId = decoded.payload.id;
            const user = await Account.findById(userId).lean();

            res.locals.hyperlinks = hyperlinksSidebarUser( 'myPaymentHistory');
            res.locals.userId = userId;
            res.locals.breadCrumb = pushBreadCrumb("Lịch sử mua hàng", `/user/${userId}/myPaymentHistory`);
            let announces = await announceController.getAnnounceById(userId);
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
                userId,
                user,
                announces
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
            const decoded = await jwt.decode(req.cookies.token, { complete: true });
            let userId = decoded.payload.id;
            const user = await Account.findById(userId).lean();

            let orderId = (req.params.orderId);
            res.locals.hyperlinks = hyperlinksSidebarUser( "myPaymentHistory");
            res.locals.userId = userId;
            res.locals.breadCrumb = pushBreadCrumb("Lịch sử mua hàng", `/user/${userId}/myPaymentHistory`);
            let announces = await announceController.getAnnounceById(userId);
            // for (let i = 0; i< announces.length; i++) {
            //     announces[i]['time'] = announceController.formatTime(announces[i].createdAt);
            // }
            
            const order = await Order.findById(orderId).lean();
            for (let i = 0; i < order.detail.length; i++) {
                const pId = order.detail[i].product;
                const product = await Product.findById(pId).lean();
                order.detail[i].product = product;
            }
            res.render("layouts/user/detailOrder", {
                layout: "user/main",
                order,
                user,
                announces
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
            const decoded = await jwt.decode(req.cookies.token, { complete: true });
            let userId = decoded.payload.id;
            const user = await Account.findById(userId).lean();

            res.locals.hyperlinks = hyperlinksSidebarUser( 'account');
            res.locals.userId = userId;
            res.locals.breadCrumb = pushBreadCrumb("Tài khoản của tôi", `/user/${userId}/account`);
            let announces = await announceController.getAnnounceById(userId);
            console.log(announces);
            let correspondingAccount = await Account.findById(userId);
            if (!correspondingAccount) {
                res.redirect('layouts/error/404');
            }
            res.render("layouts/user/account", {
                layout: "user/main",
                account: correspondingAccount.toObject(),
                user,
                announces
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
            const decoded = await jwt.decode(req.cookies.token, { complete: true });
            let userId = decoded.payload.id;
            const user = await Account.findById(userId).lean();

            res.locals.hyperlinks = hyperlinksSidebarUser( 'accountPayment');
            res.locals.userId = userId;
            res.locals.breadCrumb = pushBreadCrumb("Tài khoản thanh toán", `/user/${userId}/accountPayment`);
            let announces = await announceController.getAnnounceById(userId);
            // for (let i = 0; i< announces.length; i++) {
            //     announces[i]['time'] = announceController.formatTime(announces[i].createdAt);
            // }
            let paymentAccount = await PaymentAccount.findOne({
                paymentAccountId: Number(userId),
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
                announces
            });
        } catch (error) {
            res.status(500).json({
                status: "Server Error",
                message: error?.message || 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            });
        }
    },
    changePassword: async (req, res) => {
        try {
            let correspondingAccount = await Account.findById(req.body.id).select('+password');
            if (!correspondingAccount) {
                res.status(400).json({
                    status: "failed",
                    message: "Account này không tồn tại để đổi mật khẩu"
                })
                return
            }
            const isMatch = await correspondingAccount.correctPassword(req.body.oldPassword, correspondingAccount.password)
            if (!isMatch) {
                res.status(400).json({
                    status: "failed",
                    message: "Mật khẩu cũ chưa đúng. Vui lòng nhập lại"
                })
                return
            }
            const newPassword = await bcrypt.hash(req.body.newPassword, 12)
            await correspondingAccount.updateOne({ password: newPassword })
            res.json({ status: "success", message: "Đổi mật khẩu thành công!" })
        } catch (error) {
            res.status(500).json({
                status: "Server Error",
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            });
        }
    },
}
