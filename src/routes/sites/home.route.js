const express = require('express');
const router = express.Router();

const homeController = require('../../controllers/sites/home.controller');

router.get("/signin", homeController.signIn);
router.get("/signup", homeController.signUp);
router.get('/', homeController.get);

module.exports = router;