const express = require('express');
const auth = require("../controllers/auth");
const userController = require("../controllers/user.js");

const router = express.Router();

router.post('/signin', auth.optional, userController.signin);
router.post('/login', auth.optional, userController.login);
router.post('/user', auth.required, userController.user);

module.exports = router;