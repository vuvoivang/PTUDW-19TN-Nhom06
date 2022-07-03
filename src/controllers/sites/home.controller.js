const Category = require('../../models/Category');
const Package = require('../../models/Package');
const jwt = require('jsonwebtoken');
const Account = require('../../models/Account');
const PackageStatistics = require('../../models/PackageStatistics');

module.exports = {
    get: async (req, res) => {
        try {
            let categories = await Category.find({});
            categories = categories.map((category) => category.toObject());

            // get all popular packages
            let packages = await Package.find({}).lean();
            let packageStatistics = await PackageStatistics.find({}).lean();
            packages.forEach((package) => {
                package.totalSold = 0;
                packageStatistics.forEach((statistic) => {
                    if (package._id == statistic.package) {
                        package.totalSold += statistic.totalSold;
                    }
                });
            });
            packages = packages.sort(function (x, y) {
                if (x.totalSold < y.totalSold) {
                    return 1;
                }
                if (x.totalSold > y.totalSold) {
                    return -1;
                }
                return 0;
            });
            // get max 8 packages
            packages = packages.slice(0, 8);
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
    },
};
