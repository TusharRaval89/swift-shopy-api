let jwt = require('jsonwebtoken')
let ADMIN = require('../Model/admin')

exports.adminAuth = async function (req,res,next) {
    // console.log("hii");
    try {
       let token = req.headers.authorization
    //    console.log(token);
    if (!token) {
        throw new Error("Please Attach Token");
    }
        
    let tokenVerify = jwt.verify(token,'SECURE')
    if (!tokenVerify) {
        throw new Error("Invalid Token");
    }
    console.log("token verify ==>",tokenVerify);
    
    let adminVerify = await ADMIN.findById(tokenVerify.id)
    if (!adminVerify) {
        throw new Error("Admin Not Found");
    }

    // req.user = adminVerify;
    // console.log("user verify==>",req.user);
    req.admin = adminVerify;

     next()   
    } catch (error) {
        res.status(404).json({
            status:'Fail',
            message:error.message
        })
    }
    
}