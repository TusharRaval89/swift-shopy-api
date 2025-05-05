var express = require('express');
var router = express.Router();
let cartController = require('../Controller/cart')
let userSecure = require('../Middleware/user')

router.post('/create', userSecure.userAuth, cartController.addToCart)
router.get('/find/:userId', userSecure.userAuth, cartController.getCart)
router.delete('/delete/:id', userSecure.userAuth, cartController.deleteCart)

module.exports = router;
