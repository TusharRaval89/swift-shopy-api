let mongoose = require('mongoose')
let Schema = mongoose.Schema

let cartSchema = new Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    quantity:{
        type:Number,
        default:1,
        required:true
    }
},{timestamps:true})

let CART = mongoose.model('cart',cartSchema)
module.exports = CART


