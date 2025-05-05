let REVIEW = require('../Model/review')


exports.createReview = async function (req, res, next) {
    try {
        const { productId, ratingCount, customerSay, userId } = req.body

        const payload = {
            productId,
            userId,
            ratingCount,
            customerSay
        }

        const reviewData = await REVIEW.create(payload)

        const populateReview = await REVIEW.findById(reviewData._id).populate('productId').populate('userId')
        res.status(201).json({
            status: "Success",
            message: 'Customer Review Created Successfully',
            data: populateReview
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.AllFindReview = async function (req, res, next) {
    try {
        let reviewData = await REVIEW.find().populate('productId').populate('userId')
        res.status(200).json({
            status: 'Success',
            message: 'All Review Fetch Successfully',
            data: reviewData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.oneFindReview = async function (req, res, next) {
    try {
        let productId = req.params.productId
        let reviewData = await REVIEW.find({productId: productId}).populate('productId').populate('userId')
        res.status(200).json({
            status: "Success",
            message: 'One Review Find Successfully',
            data: reviewData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.deleteReview = async function (req, res, next) {
    try {
        let id = req.params.id
        let reviewData = await REVIEW.findByIdAndDelete(id).populate('productId')
        res.status(200).json({
            status: 'Success',
            message: "Review Delete Successfully",
            data: reviewData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}