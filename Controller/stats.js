let CATEGORY = require('../Model/category')
let PRODUCT = require('../Model/product')
let CART = require('../Model/cart')
let BRAND = require('../Model/brand')

exports.getStas = async function (req,res,next) {
    try {
        const totalCategories = await CATEGORY.countDocuments();
        const totalProducts = await PRODUCT.countDocuments();
        const totalCarts = await CART.countDocuments();
        const totalBrands = await BRAND.countDocuments();

        res.status(200).json({
            status:'Success',
            message:'Get All Stats',
            totalCategories,
            totalProducts,
            totalCarts,
            totalBrands
        })

    } catch (error) {
        res.status(404).json({
            status:'Fail',
            message:error.message
        })
    }
}


// exports.getUserProfile = async function (req, res, next) {
//     try {
//         let token = req.headers.authorization
//         // console.log(token);

//         if (!token) {
//             throw new Error("Please Attach Token");
//         }

//         let tokenVerify = jwt.verify(token, 'USER_SECURE')
//         if (!tokenVerify) {
//             throw new Error("Invalid Token");
//         }

//         let userVerify = await USER.findById(tokenVerify.id)
//         // console.log(userVerify);

//         if (!userVerify) {
//             throw new Error("User Not Found");
//         }

//         let userData = await USER.findOne(userVerify)
//         console.log(userData);

//         res.status(200).json({
//             status: 'Success',
//             message: 'User Data Find Successfull',
//             data: userData
//         })

//     } catch (error) {
//         res.status(404).json({
//             status: 'Fail',
//             message: error.message
//         })
//     }
// }