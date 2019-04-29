const express = require('express');
const auth = require("../controllers/auth");
const authRoutes = require("./auth");
const todoRoutes = require("./todo");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/todo', auth.required, todoRoutes);

module.exports = router;