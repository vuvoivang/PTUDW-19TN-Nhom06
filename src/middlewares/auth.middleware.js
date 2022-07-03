const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
const { hyperlinksSidebarAdmin, hyperlinksSidebarUser, hyperlinksSidebarManager } = require('../constants/index');

const mustLoggedIn = async (req, res, next) => {
    if (req.cookies.token) {
        const decoded = await jwt.decode(req.cookies.token, { complete: true });
        const id = decoded.payload.id;
        const user = await Account.findById(id).lean();
        if (!user) {
            res.redirect('/authorize');
        }
        req.userId = user._id;
        req.userRole = user.role;
        return next();
    } else {
        res.redirect('/authorize');
    }
};

const checkLoggedIn = async (req, res, next) => {
    if (req.cookies.token) {
        const decoded = await jwt.decode(req.cookies.token, { complete: true });
        const id = decoded.payload.id;
        const role = decoded.payload.role;
        const user = await Account.findById(id).lean();
        if (!user) {
            res.locals.user = null;
            res.locals.isLoggedIn = false;
        }
        res.locals.user = user;
        res.locals.isLoggedIn = true;
        if (role == 'admin') {
            res.locals.hyperlinks = hyperlinksSidebarAdmin;
        } else if (role == 'user') {
            res.locals.hyperlinks = hyperlinksSidebarUser(id);
        } else {
            res.locals.hyperlinks = hyperlinksSidebarManager;
        }
        return next();
    } else {
        res.locals.user = null;
        res.locals.isLoggedIn = false;
        return next();
    }
};

module.exports = { mustLoggedIn, checkLoggedIn };
