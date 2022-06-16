const Account = require('../models/account.model')
const jwt = require('jsonwebtoken')

module.exports = {
    viewManager: async (req, res) => {
        const decoded = await jwt.decode(req.cookies.token, { complete: true });
        const id = decoded.payload.id;
        const user = await Account.findById(id).lean();
        console.log('Admin view check\n', user);
        if (user) {
            res.render('layouts/admin/managerCreate', {
                layout: 'main',
                user
            })
        }
        else {
            console.log('User not found');
        }
    },
    viewPlace: async (req, res) => {
        const decoded = await jwt.decode(req.cookies.token, { complete: true });
        const id = decoded.payload.id;
        const user = await Account.findById(id).lean();
        console.log('Admin view check\n', user);
        if (user) {
            res.render('layouts/admin/managerCreate', {
                layout: 'main',
                user
            })
        }
    },
    createmanager: async (req, res) => {
        const decoded = await jwt.decode(req.cookies.token, { complete: true });
        const id = decoded.payload.id;
        const user = await Account.findById(id).lean();
        if (user) {
            res.render('layouts/admin/managerCreate', {
                layout: 'main',
                user
            })
        }
    }
}