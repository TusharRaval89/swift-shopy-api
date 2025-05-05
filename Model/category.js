let mongoose = require('mongoose')
let Schema = mongoose.Schema

let categorySchema = new Schema({
    category: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Category'],
        unique: true
    }
})

let CATEGORY = mongoose.model('category', categorySchema)
module.exports = CATEGORY