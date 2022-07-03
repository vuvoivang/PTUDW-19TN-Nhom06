const Category = require('../../models/Category');
const Package = require('../../models/Package');
const jwt = require('jsonwebtoken');
const Account = require('../../models/Account');
const { hyperlinksSidebarAdmin, hyperlinksSidebarUser, hyperlinksSidebarManager } = require('../../constants/index');

module.exports = {
    get: async (req, res) => {
        try {
            // get all categories
            if(req.cookies.token) {
                let decoded = await jwt.decode(req.cookies.token, {complete: true});
                let id = decoded.payload.id;
                let role = decoded.payload.role;
                let user = await Account.findById(id).lean();
                res.locals.user = user;
                res.locals.isLoggedIn = true;
                if (role == 'admin') {
                    res.locals.hyperlinks = hyperlinksSidebarAdmin('view');
                }
                else if (role == 'user') {
                    res.locals.hyperlinks = hyperlinksSidebarUser(id, 'account');
                }
                else {
                    res.locals.hyperlinks = hyperlinksSidebarManager('patient-management');
                }
            }
            let categories = await Category.find({});
            categories = categories.map((category) => category.toObject());

            // get all package ? TODO: popular packages
            let packages = await Package.find({});
            packages = packages.map((package) => package.toObject());
            res.render('layouts/sites/home', {
                layout: 'sites/main',
                categories,
                packages,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 'Server Error',
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: 'SERVER_ERROR',
            });
        }
    },
    
    signIn: (req, res) => {
        res.render('layouts/sites/signin');
    },
    signUp: (req, res) => {
        res.render('layouts/sites/signup');
    },
    authorize: (req, res) => {
        res.render('layouts/sites/authorize');
    }
};
