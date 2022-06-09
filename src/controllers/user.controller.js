const mongoose = require('mongoose');
const Account = require('../models/Account')

const { hyperlinksSidebarUser, userBreadCrumb } = require('../constants/index');
module.exports = {
    getAccount: async (req, res, next) => {
        try {
            const account = await Account.findById(req.params.id);
            account.then(account => res.json({ status: "success", data: account }))
                .catch(next)
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "Server Error",
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            });
        }
    },
    getAccountPayment: (req, res) => {
        res.locals.hyperlinks = hyperlinksSidebarUser;
        let thisBreadCrumb = {};
        Object.assign(thisBreadCrumb, userBreadCrumb);
        thisBreadCrumb.path = [...userBreadCrumb.path];
        thisBreadCrumb.path.push({
            label: "Tài khoản thanh toán",
            link: "/user/accountPayment",
            isActive: true
        })
        thisBreadCrumb.mainLabel = "Tài khoản thanh toán";
        res.locals.breadCrumb = thisBreadCrumb;
        res.locals.userId = Number(req.params.userId);
        res.render("layouts/user/accountPayment", {
            layout: "user/main",
            isHaveAccountPayment: false
        });
    }
}
