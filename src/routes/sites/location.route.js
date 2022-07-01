const express = require('express');
const adminController = require('../../controllers/admin.controller');
const router = express.Router();

router.route('/view').post(adminController.getQuarantineLocation);
router.route('/edit').post(adminController.editQuarantineLocation);
router.route('/delete').post(adminController.deleteQuarantineLocation);
router.route('/create').post(adminController.addQuarantineLocation);

module.exports = router;