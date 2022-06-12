const mongoose = require('mongoose');
const PaymentAccount = require('../models/PaymentAccount')

module.exports = {
    createAccountPayment: async (req, res) => {
        try {
            await PaymentAccount.create({
                paymentAccountId: req.body.id,
                password: req.body.newPassword,
                balance: 0
            });
            res.json({ status: "success" })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "Server Error",
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            });
        }
    },
    deposit: async (req, res) => {
        try {
            let updatedAccountPayment = await PaymentAccount.findOneAndUpdate({
                paymentAccountId: req.body.id,
            }, {
                balance: req.body.amount
            });
            res.json({ status: "success", data: updatedAccountPayment })
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
