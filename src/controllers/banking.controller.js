const mongoose = require('mongoose');
const { transactionType } = require('../constants');
const PaymentAccount = require('../models/PaymentAccount')
const Transaction = require('../models/Transaction')
const Account = require('../models/Account')

module.exports = {
    createAccountPayment: async (req, res) => {
        try {
            let correspondingAccount = await Account.findById(req.body.id);
            if (!correspondingAccount) {
                res.status(400).json({
                    status: "failed",
                    message: "Account id này không tồn tại để liên kết tài khoản"
                })
                return // to stop, prevent override
            }
            await PaymentAccount.create({
                paymentAccountId: req.body.id,
                password: req.body.newPassword,
                balance: 0
            });
            res.json({ status: "success", message: "Liên kết tài khoản thanh toán thành công!" })
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
            if (!updatedAccountPayment) {
                res.status(400).json({
                    status: "failed",
                    message: "Account payment không tồn tại!"
                })
                return
            }
            let systemAccountPayment = await PaymentAccount.findOne({
                accountNumber: 10000000,
            });
            if (!updatedAccountPayment) {
                res.status(500).json({
                    status: "failed",
                    message: "Lỗi hệ thống!"
                })
                return
            }
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
            res.json({ status: "success", data: updatedAccountPayment, message: "Liên kết tài khoản thanh toán thành công!" })
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
