const express = require('express');
const router = express.Router();

const managerController = require('../controllers/manager.controller');

router.get("/", managerController.get); // default

// patient management
router.get("/patient-management", managerController.getPatientManagement);

// category management
router.get("/category-management", managerController.getCategoryManagement);

// product management
router.get("/product-management", managerController.getProductManagement);
router.get("/product-management/new", managerController.addProduct);
router.get("/product-management/:id", managerController.detailProduct);

// package management
router.get("/package-management", managerController.getPackageManagement);

// payment management
router.get("/payment-management", managerController.getPaymentManagement);

module.exports = router;
