let CART = require('../Model/cart')
let PRODUCT = require('../Model/product')

exports.addToCart = async function (req, res, next) {
    try {

        let { productId, userId, quantity } = req.body

        if (!productId) {
            throw new Error("Please Enter ProductId");
        }

        if (!quantity) {
            throw new Error("Please Enter Quantity");
        }


        const payload = {
            productId,
            quantity,
            userId
        }

        let cartData
        const cartExist = await CART.findOne({ productId })
        if (cartExist) {
            cartData = await CART.findByIdAndUpdate(cartExist._id, payload, { new: true })
        } else {
            cartData = await CART.create(payload)
        }

        // console.log("cart Data",cartData);

        const populateCart = await CART.findById(cartData._id).populate([
            {
                path: 'productId',
                populate: {
                    path: 'category',
                    select: 'category'
                }
            },
            {
                path: 'userId',
            }
        ]);

        res.status(201).json({
            status: 'Success',
            message: 'Add to Cart Successfull',
            data: populateCart
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.getCart = async function (req, res, next) {
    try {
        let userId = req.params.userId
        // console.log("user id ===>",userId);
        
        let cartData = await CART.find({userId:userId}).populate([
            {
                path: 'productId',
                populate: {
                    path: 'category',
                    select: 'category'
                }
            },
            {
                path: 'userId',
            }
        ]);

        res.status(200).json({
            status: 'Success',
            message: 'Cart Fetch Successfully',
            data: cartData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.deleteCart = async function (req, res, next) {
    try {
        let id = req.params.id

        let cart = await CART.findById(id)
        if (!cart) {
            throw new Error("Cart Not Found");
        }

        await CART.findByIdAndDelete(id)
        res.status(200).json({
            status: 'Success',
            message: 'Cart Delete Successfull',
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}