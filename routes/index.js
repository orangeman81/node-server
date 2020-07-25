const express = require('express');
const auth = require("../controllers/auth");
const authRoutes = require("./auth");
const todoRoutes = require("./todo");
const messageRoutes = require("./message");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/todo', auth.required, todoRoutes);
router.use('/message', auth.required, messageRoutes);

module.exports = router;