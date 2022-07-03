const Account = require('../models/Account');
const Announce = require('../models/Announce');

module.exports = {
    create: async (req, res) => {
        try {
            let array = req.body;
            for (let i = 0; i < array.length; i++) {
                let ele = array[i];
                let { userId, content } = ele;
                if (content != '') {
                    let user = await Account.findById(userId).lean();
                    if (user) {
                        await Announce.create(ele);
                    }
                }
            }
            res.status(200).json({
                status: "Create announces succesfully",
                result: "success"
            });
        } catch (error) {
            res.status(400).json({
                status: "Create announces failed",
                message: error
            })
        }
    },
    getAnnounceById: async (userId) => {
        try {
            let user = await Account.findById(userId).lean();
            if (!user) {
                return null;
            }
            else {
                let announces = await Announce.find({
                    userId,
                    isDelete: false
                }).lean();
                if (!announces) {
                    return null
                }
                else {
                    return announces;
                }
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    formatTime: (createAt) => {
        let createMilisecond = createAt.getTime();
        let nowMilisecond = Date.now().getTime();

        let durationMilisecond = nowMilisecond - createMilisecond;
        durationMilisecond = durationMilisecond / 1000 / 60;
        let time = '';
        if (durationMilisecond < 60) {
            time = (Math.floor(durationMilisecond + 1)).toString + 'minutes';
        }
        else {
            durationMilisecond = durationMilisecond / 60;
            if (durationMilisecond < 24) 
                time = (Math.floor(durationMilisecond + 1)).toString + 'hours';
            else {
                durationMilisecond = durationMilisecond / 24;
                time = (Math.floor(durationMilisecond + 1)).toString + 'days';
            }
        }
        return time;
    }
}