let USER = require('../Model/users')
let jwt = require('jsonwebtoken')

exports.userAuth = async function (req,res,next) {
    try {
        let token = req.headers.authorization
        // console.log(token);
        if (!token) {
            throw new Error("Please Attach Token");
        }

        let tokenVerify = jwt.verify(token,'USER_SECURE')
        if (!tokenVerify) {
            throw new Error("Please Enter Valid Token");
        }

        let userVerify = await USER.findById(tokenVerify.id)
        console.log('tokenVerify :- ', tokenVerify)
        console.log('userVerify :- ', userVerify)
        if (!userVerify) {
            throw new Error("User Not Found");
        }

        next()
        
    } catch (error) {
        res.status(404).json({
            status:'Fail',
            message:error.message
        })
    }    
}