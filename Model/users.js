let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: [true, 'Please Enter First Name']
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Last Name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Email'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please Enter a Valid Email']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Password']
    },
    profileImg:{
        type:String
    }
})

let USER = mongoose.model('user', userSchema)
module.exports = USER