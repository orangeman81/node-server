const express = require('express');
const todoController = require("../controllers/todo");

const router = express.Router();

router.get('/list', todoController.findAll);
router.get('/:id', todoController.findOne);
router.post('/create', todoController.create);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.delete);

module.exports = router;