var express = require('express');
var router = express.Router();
let statsController = require('../Controller/stats')

/* GET home page. */
router.get('/',statsController.getStas)

module.exports = router;
