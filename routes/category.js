var express = require('express');
var router = express.Router();
let categoryController = require('../Controller/category')
let adminSecure = require('../Middleware/admin')

/* GET home page. */
router.post('/create', adminSecure.adminAuth, categoryController.categoryCreate)
router.get('/find', categoryController.AllCategoryFind)
router.get('/find/:id', categoryController.oneCategoryFind)
router.delete('/delete/:id', adminSecure.adminAuth, categoryController.categoryDelete)
router.patch('/update/:id', adminSecure.adminAuth, categoryController.categoryUpdate)
router.get('/search', categoryController.categorySearch)


module.exports = router;
