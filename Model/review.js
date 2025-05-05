let mongoose = require('mongoose')
let Schema = mongoose.Schema

let reviewSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        // required:[true,'Please Enter ProductId']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    ratingCount: {
        type: Number,
        // required:true,
        min: 1,
        max: 5
    },
    customerSay: {
        type: String,
        trim: true,
        // required:[true,'Please Enter customerSay']
    }
})

let REVIEW = mongoose.model('review', reviewSchema)
module.exports = REVIEW
