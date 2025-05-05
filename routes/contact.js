var express = require('express');
var router = express.Router();
let contactController = require('../Controller/contact')
let userSecure = require('../Middleware/user')



/* GET home page. */
router.post('/create',userSecure.userAuth,contactController.contactCreate)
router.get('/find',contactController.contactGetAll)

module.exports = router;
