let mongoose = require('mongoose')
let Schema = mongoose.Schema

let contactSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    subject:{
        type:String,
        trim:true,
        required:[true,'Please Enter Subject']
    },
    message:{
        type:String,
        trim:true,
        required:[true,'Please Enter Message']
 
    }
})

let CONTACT = mongoose.model('contact',contactSchema)
module.exports = CONTACT
