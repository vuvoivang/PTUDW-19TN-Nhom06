const express = require('express');
const managerController = require('./../../controllers/manager.controller');
const router = express.Router();

router.route('/create').post(managerController.createManager);
// router.route('/view').post(managerController.viewManager);
router.route('/update').post(managerController.updateManager);

module.exports = router;