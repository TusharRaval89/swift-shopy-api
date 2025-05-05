let mongoose = require('mongoose')
let Schema = mongoose.Schema

let brandSchema = new Schema({
    brandName:{
        type:String,
        required:[true,'Please Enter Brand Name'],
        trim:true,
        unique:true
    }
},{timestamps:true})

let BRAND = mongoose.model('brand',brandSchema)
module.exports = BRAND

