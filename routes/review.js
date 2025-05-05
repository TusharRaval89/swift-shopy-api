var express = require('express');
var router = express.Router();
let reviewController = require('../Controller/review')

/* GET home page. */
router.post('/create', reviewController.createReview)
router.get('/find', reviewController.AllFindReview)
router.get('/find/:productId', reviewController.oneFindReview)
router.delete('/delete/:id', reviewController.deleteReview)

module.exports = router;
