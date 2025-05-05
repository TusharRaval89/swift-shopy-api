let CART = require('../Model/cart')
let PRODUCT = require('../Model/product')

exports.adminGetCart = async function (req, res, next) {
    try {
        let cartData = await CART.find().populate({
            path: 'productId',
            populate: {
                path: 'category',
                select: 'category'
            }
        }).populate({
            path:'userId'
        })
        res.status(200).json({
            status: 'Success',
            message: 'Admin Cart Fetch Successfully',
            data: cartData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}