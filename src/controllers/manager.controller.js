const { categories, products, packages } = require('../models/manager.model');
const path = "layouts/manager";
const Account = require('../models/Account');
const Permission = require('../models/Permission');
const LogManager = require('../models/LogManager');

const createPermission = async (managerUsername, permissions) => {
    try {
        let newPermiss = await Permission.create({ managerUsername, permissions });
        return true;
    } catch (error) {
        return false;
    }
};

const updatePermission = async (req, res) => {
    try {
        let { managerUsername, permissions } = req.body;
        let permiss = await Permission.findOne({ managerUsername });
        if (permiss) {
            await Permission.findByIdAndUpdate(permiss._id, { permissions });
            res.status(200).json({
                status: 'Update permission successfully',
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error
        });
    }
};

const getPermission = async (req, res) => {
    try {
        let managerUsername = req.body.managerUsername;
        let view = await Permission.findOne({ managerUsername }).lean();
        res.status(200).json({
            status: 'Get permission successfully',
            permissions: view.permissions
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error
        });
    }
};


module.exports = {
    get: (req, res) => {
        res.render(`${path}/main`, {
            main: true,
            tag: "patient"
        });
    },

    // patient
    getPatientManagement: (req, res) => {
        res.render(`${path}/patientManagement`, {
            layout: "manager/main",
            tag: "patient"
        });
    },

    // category
    getCategoryManagement: (req, res) => {
        res.render(`${path}/categoryManagement`, {
            layout: "manager/main",
            tag: "category",
            categories
        })
    },

    // product
    getProductManagement: (req, res) => {
        res.render(`${path}/productManagement`, {
            layout: "manager/main",
            tag: "product",
            products
        })
    },

    addProduct: (req, res) => {
        res.render(`${path}/addProduct`, {
            layout: "manager/main",
            tag: "product"
        })
    },

    detailProduct: (req, res) => {
        res.render(`${path}/detailProduct`, {
            layout: "manager/main",
            tag: "product"
        })
    },

    // package
    getPackageManagement: (req, res) => {
        res.render(`${path}/packageManagement`, {
            layout: "manager/main",
            tag: "package",
            packages
        })
    },

    addPackage: (req, res) => {
        res.render(`${path}/addPackage`, {
            layout: "manager/main",
            tag: "package",
            products
        })
    },

    detailPackage: (req, res) => {
        res.render(`${path}/detailPackage`, {
            layout: "manager/main",
            tag: "package",
            products
        })
    },

    // payment
    getPaymentManagement: (req, res) => {
        res.render(`${path}/paymentManagement`, {
            layout: "manager/main",
            tag: "payment"
        })
    },
    createManager: async (req, res, next) => {
        try {
            let { username, password, permissions } = req.body;

            if (!username || !password) {
                return next(new AppError('Please provide a valid username and password', 400))
            }
            // Truong hop chua ton tai account
            let data = {
                username,
                password,
                role: 'active_manager',
                auth: 'normal'
            }

            const newAccount = await Account.create(data);
            const newPermiss = await createPermission(newAccount._id, permissions);

            res.status(200).json({
                status: "Create manager successfully",
                newPermiss
            });
        } catch (error) {
            res.status(400).json({
                status: "Error creating manager",
                message: error
            });
        }
    },
    updateManager: async (req, res, next) => {
        try {
            let { username, state, permissions } = req.body;
            if (!username) {
                return next(new AppError('Please provide a valid username', 400));
            }
            if (state === 'active') {
                state = 'active_manager';
            }
            else {
                state = 'inactive_manager';
            }

            let manager = await Account.findOneAndUpdate({ username }, {
                role: state,
                permissions
            });
            res.status(200).json({
                status: "Update manager successfully"
            });
        } catch (error) {
            res.status(400).json({
                status: "Error updating manager",
                message: error
            });
        }
    },
    getPermission,
    updatePermission,
    getLog: async (req, res) => {
        try {
            let { managerUsername } = req.body;
            let log = await LogManager.findOne({ managerUsername }).lean();
            if (log) {
                res.status(200).json({
                    status: "Get manager log successfully",
                    log
                });
            }
            else {
                res.status(400).json({
                    status: "Get manager log failed",
                    message: "There is no history with this username"
                });
            }
        } catch (error) {
            res.status(400).json({
                status: "Get manager log failed",
                message: error
            });
        }
    }
}
