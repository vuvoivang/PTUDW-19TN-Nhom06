const Account = require('../models/Account');
const Announce = require('../models/Announce');
const Debt = require('../models/debt');

module.exports = {
    getDebts: async () => {
        let debts = await Debt.find({isAnnounce: false}).lean();
        return debts;
    },
    updateDebts: async (req, res) => {
        try {
            if (!req.body.data) {
                res.status(400).json({
                    status: "Update debts failed"
                });
            }
            else {
                let array = req.body.data;
                for (let i = 0; i < array.length; i++) {
                    let { userId, debt } = array[i];
                    if (!userId || !debt) {
                        res.json({
                            status: "Update debts failed",
                            result: "failed"
                        });
                    }
                    else {
                        let user = await Account.findById(userId).lean();
                        if (!user) {
                            res.json({
                                status: "Update debts failed",
                                result: "failed"
                            });
                        }
                        else {
                            let content = `Bạn cần thanh toán ${debt} đồng`;
                            await Announce.create({ userId, content });
                            await Debt.findOneAndUpdate({ userId, isAnnounce: false }, { isAnnounce: true });
                        }
                    }
                }
                res.json({
                    status: "Update debt successfully",
                    result: "success"
                });
            }
        } catch (error) {
            res.status(400).json({
                status: "Update debts failed",
                message: error
            });
        }
    },
    createDebt: async (req, res) => {
        try {
            let {userId, state, debt, displayName} = req.body;

            if (!userId || !state || !debt || !displayName) {
                res.status(400).json({
                    status: "Create debt failed"
                });
            }
            else {
                let newDebt = await Debt.create({
                    userId, 
                    state,
                    debt,
                    displayName
                });
                res.status(200).json({
                    status: "Create debt successfully",
                    debt: newDebt
                });
            }
        } catch (error) {
            res.status(400).json({
                status: "Create debts failed",
                message: error
            });
        }
    }
}