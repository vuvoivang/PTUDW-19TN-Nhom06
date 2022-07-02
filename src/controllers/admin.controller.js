const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
const { hyperlinksSidebarAdmin, adminBreadCrumb } = require('../constants/index');
const QuarantineLocation = require('../models/QuarantineLocation');

const pushBreadCrumb = (label, link, isActive = true) => {
    let thisBreadCrumb = {};
    Object.assign(thisBreadCrumb, adminBreadCrumb);
    thisBreadCrumb.path = [...adminBreadCrumb.path];
    thisBreadCrumb.path.push({
        label,
        link,
        isActive
    })
    thisBreadCrumb.mainLabel = label;
    return thisBreadCrumb;
};

module.exports = {
    viewManager: async (req, res) => {
        res.locals.hyperlinks = hyperlinksSidebarAdmin;
        const decoded = await jwt.decode(req.cookies.token, { complete: true });
        const id = decoded.payload.id;
        const user = await Account.findById(id).lean();
        res.locals.breadCrumb = pushBreadCrumb("Quản lý tài khoản", `/admin/view`);
        let managers = await Account.find({
            $or: [
                { 'role': 'active_manager' },
                { 'role': 'inactive_manager' }
            ]
        }).lean();

        for (let i = 0; i < managers.length; i++) {
            managers[i].state = managers[i].role.split('_')[0];
        }

        if (user) {
            res.render('layouts/admin/managerView', {
                layout: 'admin/main',
                user,
                managers
            });
        }
    },

    viewPlace: async (req, res) => {
        res.locals.hyperlinks = hyperlinksSidebarAdmin;
        const decoded = await jwt.decode(req.cookies.token, { complete: true });
        const id = decoded.payload.id;
        const user = await Account.findById(id).lean();
        res.locals.breadCrumb = pushBreadCrumb("Quản lý cơ sở", `/admin/place`);
        if (user) {
            const locations = await QuarantineLocation.find().lean();
            res.render('layouts/admin/placeView', {
                layout: 'admin/main',
                user,
                locations
            })
        }
    },
    createManager: async (req, res) => {
        res.locals.hyperlinks = hyperlinksSidebarAdmin;
        const decoded = await jwt.decode(req.cookies.token, { complete: true });
        const id = decoded.payload.id;
        const user = await Account.findById(id).lean();
        res.locals.breadCrumb = pushBreadCrumb("Tạo tài khoản", `/admin/create`);
        if (user) {
            res.render('layouts/admin/managerCreate', {
                layout: 'admin/main',
                user
            });
        }
    },
    getQuarantineLocation: async (req, res) => {
        try {
            let locations = await QuarantineLocation.find();
            if (locations) {
                res.status(200).json({
                    status: "Get quarantine locations successfully",
                    size: locations.length,
                    locations
                });
            }
            else {
                res.status(400).json({
                    status: "Get quarantine locations failed",
                    message: "Data is null"
                });
            }
        } catch (error) {
            res.status(400).json({
                status: "Get quarantine locations failed",
                message: error
            });
        }
    },
    editQuarantineLocation: async (req, res) => {
        try {
            let { id } = req.body;
            let location = await QuarantineLocation.findById(id).lean();
            if (location) {
                await QuarantineLocation.findByIdAndUpdate(id, {
                    name: req.body.name,
                    capacity: req.body.capacity
                }).lean();
                res.status(200).json({
                    status: "Edit quarantine location successfully"
                });
            }
            else {
                res.status(400).json({
                    status: "Edit quarantine location failed",
                    message: "No location found"
                });
            }
        } catch (error) {
            res.status(400).json({
                status: "Edit quarantine location failed",
                message: error
            });
        }
    },
    addQuarantineLocation: async (req, res) => {
        try {
            let { name, capacity } = req.body;
            let location = await QuarantineLocation.findOne({ name }).lean();
            if (location) {
                res.status(200).json({
                    status: "Create quarantine location failed",
                    message: "Exist location with this name"
                })
            }
            else {
                let newLocation = await QuarantineLocation.create({
                    name,
                    capacity,
                    patientsNumber: 0,
                    address: ""
                });
                res.status(200).json({
                    status: "Create quarantine location successfully",
                    location: newLocation
                });
            }
        } catch (error) {
            res.status(400).json({
                status: "Edit quarantine location failed",
                message: error
            });
        }
    },
    deleteQuarantineLocation: async (req, res) => {
        try {
            let { name } = req.body;
            let location = await QuarantineLocation.findOne({ name }).lean();
            if (location) {
                await QuarantineLocation.findOneAndDelete({ name });
                res.status(200).json({
                    status: "Delete quarantine location successfully"
                });
            }
            else {
                res.status(400).json({
                    status: "Delete quarantine location failed",
                    message: "No location found"
                });
            }
        } catch (error) {
            res.status(400).json({
                status: "Edit quarantine location failed",
                message: error
            });
        }
    }
}