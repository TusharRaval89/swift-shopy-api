let mongoose = require('mongoose')
let Schema = mongoose.Schema

let productSchema = new Schema({
    thumbnail: {
        type: String,
    },
    images: {
        type: [String],
        default: []
    },
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
    },
    discountPrice: {
        type: Number,
    },
    discountPercentage: {
        type: String,
    },
    rating: {
        type: String,
    },
    highestPurchase: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand'
    }
}, { timestamps: true })

let PRODUCT = mongoose.model('product', productSchema)
module.exports = PRODUCT