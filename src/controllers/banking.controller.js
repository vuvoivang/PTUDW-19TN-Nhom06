const mongoose = require('mongoose');
const { transactionType } = require('../constants');
const PaymentAccount = require('../models/PaymentAccount')
const Transaction = require('../models/Transaction')

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
            let updatedAccountPayment = await PaymentAccount.findOne({
                paymentAccountId: req.body.id,
            });

            let systemAccountPayment = await PaymentAccount.findOne({
                accountNumber: 10000000,
            });

            if (updatedAccountPayment && systemAccountPayment) {
                updatedAccountPayment.balance = Number(updatedAccountPayment.balance) + Number(req.body.amount);
                systemAccountPayment.balance = Number(systemAccountPayment.balance) + Number(req.body.amount);
                await updatedAccountPayment.save()
                await systemAccountPayment.save()

                await Transaction.create({
                    accountId: updatedAccountPayment._id,
                    amount: req.body.amount,
                    type: transactionType.deposit,
                    description: "Nạp tiền vào tài khoản"

                })
            }

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
