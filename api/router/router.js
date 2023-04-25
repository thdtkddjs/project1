const express = require('express');
const router = express.Router();
const todoController = require('../controllers/controller');

router.post('/id', todoController.selectId);
router.post('/insert', todoController.insertUser);

module.exports = router;




