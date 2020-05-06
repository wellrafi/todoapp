var express = require('express');
var router = express.Router();
var todoController = require('./controller/todoController')

router.use('/todo', todoController);

module.exports = router;
