const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
const { hyperlinksSidebarAdmin, adminBreadCrumb } = require('../constants/index');
const managerController = require('../controllers/manager.controller')

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
        let managers = await Account.find({$or: [
            {'role': 'active_manager'},
            {'role': 'inactive_manager'}
        ]});

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
        // hyperlinksSidebarAdmin[0].style = 'background-color: #374151;';
        
        // push breadcrumb for this page
        // let userId = (req.params.userId);
        // res.locals.userId = userId;
        // res.locals.breadCrumb = pushBreadCrumb("Tài khoản thanh toán", `/user/${userId}/accountPayment`);
    },
    
    viewPlace: async (req, res) => {
        const decoded = await jwt.decode(req.cookies.token, { complete: true });
        const id = decoded.payload.id;
        const user = await Account.findById(id).lean();
        // console.log('Admin view check\n', user);
        if (user) {
            res.render('layouts/admin/managerCreate', {
                layout: 'admin/main',
                user
            })
        }
    },
    createmanager: async (req, res) => {
        res.locals.hyperlinks = hyperlinksSidebarAdmin;
        const decoded = await jwt.decode(req.cookies.token, { complete: true });
        const id = decoded.payload.id;
        const user = await Account.findById(id).lean();
        if (user) {
            res.render('layouts/admin/managerCreate', {
                layout: 'admin/main',
                user
            });
        }
        // hyperlinksSidebarAdmin[1].style = 'background-color: #374151;';
        
        // push breadcrumb for this page
        // let userId = (req.params.userId);
        // res.locals.userId = userId;
        // res.locals.breadCrumb = pushBreadCrumb("Tài khoản thanh toán", `/user/${userId}/accountPayment`);
    }
}