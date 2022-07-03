const express = require('express');
const managerController = require('./../../controllers/manager.controller');
const announceController = require('../../controllers/announce.controller');
const router = express.Router();

router.route('/create').post(managerController.createManager);
router.route('/update').post(managerController.updateManager);
router.route('/permission/get').post(managerController.getPermission);
router.route('/permission/update').post(managerController.updatePermission);
router.route('/announce/create').post(announceController.create);
router.route('/log').post(managerController.getLog);

module.exports = router;