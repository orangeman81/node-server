const express = require('express');
const messageController = require("../controllers/message");

const router = express.Router();

router.get('/', messageController.findAll);
router.get('/:query', messageController.search);
router.get('/:id', messageController.findOne);
router.post('/create', messageController.create);
router.put('/:id', messageController.update);
router.delete('/:id', messageController.delete);

module.exports = router;