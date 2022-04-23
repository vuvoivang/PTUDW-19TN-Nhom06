const express = require('express');
const router = express.Router();

const homeController = require('../../controllers/sites/home.controller');

router.get("/sign-in", homeController.signIn);
router.get("/sign-up", homeController.signUp);
router.get('/', homeController.get);

module.exports = router;