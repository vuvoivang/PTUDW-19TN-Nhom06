const Account = require('../models/Account');
const Announce = reuqire('../models/Announce');
const Debt = require('../models/Debt');

module.exports = {
    getDebts: async () => {
        let debts = await Debt.find({isAnnounce: false}).lean();
        return debts;
    },
    updateDebts: async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).json({
                    status: "Update debts failed"
                });
            }
            else {
                let array = req.body;
                for (let i = 0; i < array.length; i++) {
                    let { userId, debt } = array[i];
                    if (!userId || !debt) {
                        res.status(200).json({
                            status: "Update debts failed",
                            result: "failed"
                        });
                    }
                    else if (debt > 0) {
                        let user = await Account.findById(userId).lean();
                        if (!user) {
                            res.status(200).json({
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
                res.status(200).json({
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
    }
}