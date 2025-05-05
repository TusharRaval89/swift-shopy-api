let BRAND = require('../Model/brand')


exports.brandCreate = async function (req, res, next) {
    try {

        let findBrand = await BRAND.findOne({ brandName: req.body.brandName })
        if (findBrand) {
            throw new Error("Brand Already Exists");
        }

        const { brandName } = req.body
        const payload = {
            brandName
        }

        let brandData = await BRAND.create(payload)
        res.status(201).json({
            status: 'Success',
            message: 'Brand Create Successfully',
            data: brandData
        })

    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.brandAllFind = async function (req, res, next) {
    try {
        let brandData = await BRAND.find()
        res.status(200).json({
            status: 'Success',
            message: 'All Brand Fetch Successfully',
            data: brandData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.oneBrandFind = async function (req, res, next) {
    try {
        let id = req.params.id
        let brandData = await BRAND.findById(id)
        res.status(200).json({
            status: 'Success',
            message: 'One Brand Find Successfully',
            data: brandData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.deleteBrand = async function (req, res, next) {
    try {
        let id = req.params.id
        let brandData = await BRAND.findByIdAndDelete(id)

        res.status(200).json({
            status:'Success',
            message:'Brand Delete Successfully',
            data:brandData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.updateBrand = async function (req,res,next) {
    try {
        let id = req.params.id
        let brandData = await BRAND.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            status:'Success',
            message:'Brand Update Successfully',
            data:brandData
        })
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            message:error.message
        })
    }
} 