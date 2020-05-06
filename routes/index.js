var express = require('express');
var router = express.Router();

// controller
var todoController = require('./controller/todoController');

router.use('/todo', todoController);

module.exports = router;
