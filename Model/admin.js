let mongoose = require('mongoose')
let Schema = mongoose.Schema

let adminSchema = new Schema({
    firstname:{
        type:String,
        trim:true,
        required:[true,"Please Enter First Name"]
    },
    lastname:{
        type:String,
        trim:true,
        required:[true,"Please Enter Last Name"]
    },
    email: {
        type: String,
        required: [true, 'Please Enter Email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please Enter a Valid Email']
    },
    password: {
        type: String,
        required: [true,'Please Enter Password'],
        trim:true
    }

   
})

let ADMIN = mongoose.model('admin',adminSchema)
module.exports = ADMIN