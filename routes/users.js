var express = require('express');
var router = express.Router();
const multer = require('multer');

let userController = require('../Controller/users')
let adminSecure = require('../Middleware/admin')
let userSecure = require('../Middleware/user')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

/* GET users listing. */
router.post('/signup', userController.userSignup)
router.post('/login', userController.userLogin)
router.get('/find', userController.allUserFind)
router.get('/find/:id', userController.oneUserFind)
router.delete('/delete/:id', userSecure.userAuth, userController.userDelete)
router.patch('/update/:id', userSecure.userAuth, upload.single('profileImg'), userController.userUpdate);
router.get('/profile', userSecure.userAuth, userController.getUserProfile)



module.exports = router;
