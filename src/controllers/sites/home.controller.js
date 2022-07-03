const Category = require('../../models/Category');
const Package = require('../../models/Package');
const jwt = require('jsonwebtoken');

module.exports = {
    get: async (req, res) => {
        try {
            // get all categories
            if (req.cookies.token) {
                let decoded = await jwt.decode(req.cookies.token, { complete: true });
                let page = decoded.payload.role;
                if (page != 'user') {
                    res.redirect(`/${page}`);
                    return;
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
        res.render('layouts/sites/login');
    },
    signUp: (req, res) => {
        res.render('layouts/sites/signup');
    },
};
