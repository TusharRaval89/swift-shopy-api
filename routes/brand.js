var express = require('express');
var router = express.Router();
let brandController = require('../Controller/brand')

/* GET home page. */
router.post('/create',brandController.brandCreate)
router.get('/find',brandController.brandAllFind)
router.get('/find/:id',brandController.oneBrandFind)
router.delete('/delete/:id',brandController.deleteBrand)
router.patch('/update/:id',brandController.updateBrand)

module.exports = router;

