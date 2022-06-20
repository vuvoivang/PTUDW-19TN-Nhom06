const express = require('express');
const { upload } = require('../config/firebase');
const router = express.Router();
const managerController = require('../controllers/manager.controller');

router.get("/", managerController.get); // default

// patient management
router.get("/patient-management", managerController.getPatientManagement);

// category management
router.get("/category-management", managerController.getCategoryManagement);
router.post("/category-management", upload.single('image'), managerController.addCategory);
router.put("/category-management/:id", upload.single('image'), managerController.updateCategory);
router.delete("/category-management/:id", managerController.deleteCategory);

// product management
router.get("/product-management", managerController.getProductManagement);
router.get("/product-management/new", managerController.addProduct);
router.get("/product-management/:id", managerController.detailProduct);

// package management
router.get("/package-management", managerController.getPackageManagement);
router.get("/package-management/new", managerController.addPackage);
router.get("/package-management/:id", managerController.detailPackage);

// payment management
router.get("/payment-management", managerController.getPaymentManagement);

module.exports = router;
