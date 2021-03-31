var express = require('express');
var {Index} = require('../models/index');
var router = express.Router();

/* GET users listing. */
router.get('/index', function(req, res, next) {
  let my_index = new Index('Hello from Model-World','Here is nice, fresh content');
  res.json(my_index.obj);
});

module.exports = router;
