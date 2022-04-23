const express = require('express');
const router = express.Router();

const managerController = require('../controllers/manager.controller');

// patient management
// router.get("/", managerController.get); // default
router.get("/", managerController.getProductManagement);    // temporary
router.get("/patient-management", managerController.getPatientManagement);

// category management
router.get("/category-management", managerController.getCategoryManagement);

// product management
router.get("/product-management", managerController.getProductManagement);
router.get("/product-management/new", managerController.createProduct);

// package management
router.get("/package-management", managerController.getPackageManagement);

// payment management
router.get("/payment-management", managerController.getPaymentManagement);

module.exports = router;
