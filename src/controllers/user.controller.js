const Account = require('../models/account.model')
const jwt = require('jsonwebtoken')

module.exports = {
    getAccountPayment: async (req, res) => {
    const decoded = await jwt.decode(req.cookies.token, { complete: true })
    const id = decoded.payload.id
    const user = await Account.findById(id).lean()
    if (!user) {
        res.render("layouts/user/accountPayment", {
            layout: "user/main",
        });
    }
    else {
        console.log('User view check\n', user)
        res.render("layouts/user/accountPayment", {
            layout: "user/main",
            user: user
        });
    }
}
}
