const mongoose = require('mongoose');
const { transactionType } = require('../constants');
const PaymentAccount = require('../models/PaymentAccount')
const Transaction = require('../models/Transaction')
const Account = require('../models/Account')
const MinimumTransfer = require('../models/MinimumTransfer')

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
    exchange: async (req, res) => {
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
            } else if (req.body.pay && updatedAccountPayment.balance > 0) {
                res.status(400).json({
                    status: "failed",
                    message: "Bạn không có nợ để thanh toán!"
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
            let minimumTransfer = await MinimumTransfer.findOne({
                type: "main",
            });
            if (req.body.amount < minimumTransfer.value) {
                res.status(400).json({
                    status: "failed",
                    message: `Hạn mức giao dịch tối thiếu là ${minimumTransfer.value}!`
                })
                return
            }
            if (updatedAccountPayment && systemAccountPayment) {
                const updatedAccountPaymentBalance = Number(updatedAccountPayment.balance) + Number(req.body.amount);
                const systemAccountPaymentBalance = Number(systemAccountPayment.balance) + Number(req.body.amount);
               
                await updatedAccountPayment.updateOne({balance: updatedAccountPaymentBalance})
                await systemAccountPayment.updateOne({balance: systemAccountPaymentBalance})

                await Transaction.create({
                    accountId: updatedAccountPayment._id,
                    amount: req.body.amount,
                    type: transactionType.deposit,
                    description: req.body.pay? "Thanh toán nợ":"Nạp tiền vào tài khoản"

                })
                
            }
            res.json({ status: "success", data: updatedAccountPayment, message: req.body.pay?"Thanh toán nợ thành công":"Nạp tiền vào tài khoản thanh toán thành công!" })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "Server Error",
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            });
        }
    },
    updateMinimumTransfer: async (req, res) => {
        try {
            let updatedObject = await MinimumTransfer.findOne({
                type: "main",
            });
            if (!updatedObject) {
                MinimumTransfer.create({
                    value: req.body.amount,
                    type: "main",
                })
            }
            else {
                await updatedObject.updateOne({value: req.body.amount})
            }
            res.json({ status: "success", data: updatedObject, message: "Cập nhật hạn mức tối thiểu thành công!" })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "Server Error",
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            });
        }
    },
}
