var express = require('express');
var router = express.Router();
let adminController = require('../Controller/admin')
let adminCartController = require('../Controller/admin-cart')
let adminSecure = require('../Middleware/admin')

/* GET users listing. */
router.post('/signup', adminController.adminSignup)
router.post('/login', adminController.adminLogin)
router.get('/find', adminController.AlladminFind)
router.get('/find/:id', adminController.oneAdminFind)
router.delete('/delete/:id', adminSecure.adminAuth, adminController.adminDelete)
router.patch('/update/:id', adminSecure.adminAuth, adminController.adminUpdate)
router.get('/admin-get-cart', adminSecure.adminAuth, adminCartController.adminGetCart)


module.exports = router;
