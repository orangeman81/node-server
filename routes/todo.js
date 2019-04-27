const express = require('express');
const todoController = require("../controllers/todo");

const router = express.Router();

router.get('/list', todoController.getTodo);
router.post('/create', todoController.createTodo);

module.exports = router;