var express = require('express');
var router = express.Router();
const multer = require('multer');
let productController = require('../Controller/product');  // Path should match your folder structure

// Multer Setup - Memory Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route with Multer handling thumbnail (1 file) and images (up to 4 files)
router.post('/create', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 4 }
]), productController.productCreate);
router.get('/search', productController.productSearch)
router.get('/filter', productController.productFilter)
router.get('/find', productController.AllproductFind)
router.get('/find/:id', productController.oneproductFind)
router.delete('/delete/:id', productController.productDelete)
router.patch('/update/:id', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 4 }
]), productController.productUpdate);



module.exports = router;
