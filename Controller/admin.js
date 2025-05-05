let ADMIN = require('../Model/admin')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')


exports.adminSignup = async function (req, res, next) {
    try {

        let findEmail = await ADMIN.findOne({ email: req.body.email })
        if (findEmail) {
            throw new Error("Admin Already Exists");
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)
        let adminData = await ADMIN.create(req.body)
        res.status(201).json({
            status: "Success",
            message: "Admin Signup Succcessfull",
            data: adminData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.adminLogin = async function (req, res, next) {
    try {
        let adminData = await ADMIN.findOne({ email: req.body.email })
        if (!adminData) {
            throw new Error("Admin Not Found");
        }

        let checkPass = await bcrypt.compare(req.body.password, adminData.password)
        if (!checkPass) {
            throw new Error("Please Enter Valid Password");
        }

        let token = jwt.sign({id:adminData._id},'SECURE')

        res.status(200).json({
            status: "Success",
            message: "Admin Login Successfull",
            data: adminData,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.AlladminFind = async function (req, res, next) {
    try {
        let adminData = await ADMIN.find()
        if (adminData.length == 0) {
            throw new Error("Admin Not Found");
        }

        res.status(200).json({
            status: "Success",
            message: "All Admin Fetch Successfull",
            data: adminData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.oneAdminFind = async function (req, res, next) {
    try {
        let id = req.params.id
        let adminData = await ADMIN.findById(id)

        res.status(200).json({
            status: "Success",
            message: "Admin Find Successfull",
            data: adminData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.adminDelete = async function (req, res, next) {
    try {
        let id = req.params.id

        let admin = await ADMIN.findById(id)
        if (!admin) {
            throw new Error("Admin Not Found");
        }
        await ADMIN.findByIdAndDelete(id)

        res.status(200).json({
            status: "Success",
            message: " Admin Delete Successfull",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.adminUpdate = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password,10)
        let id = req.params.id
        let adminData = await ADMIN.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json({
            status: "Success",
            message: " Admin Update Successfull",
            data: adminData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}