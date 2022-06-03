const mongoose = require('mongoose');
const Account = require('../models/Account')

module.exports = {
    getAccount: async (req, res, next) =>{
        try {
            const account = await Account.findById(req.params.id);
            
            account.then(account => res.json({status: "success", data: account}))
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
        res.render("layouts/user/accountPayment", {
            layout: "user/main"
        });
    }
}
