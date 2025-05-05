let CATEGORY = require('../Model/category')


exports.categoryCreate = async function (req, res, next) {
    try {
        let findCategory = await CATEGORY.findOne({ category: req.body.category })
        if (findCategory) {
            throw new Error("Category Already Exists");
        }

        const { category } = req.body

        const payload = {
            category
        }

        let categoryData = await CATEGORY.create(payload)
        res.status(201).json({
            status: 'Success',
            message: 'Category Create Successfull',
            data: categoryData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}


exports.AllCategoryFind = async function (req, res, next) {
    try {
        let categoryData = await CATEGORY.find()

        if (categoryData.length == 0) {
            throw new Error("Category Not Found");
        }

        res.status(201).json({
            status: "Success",
            message: 'Category All Data Fetch Successfull',
            data: categoryData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.oneCategoryFind = async function (req, res, next) {
    try {
        let id = req.params.id
        let categoryData = await CATEGORY.findById(id)
        res.status(200).json({
            status: 'Success',
            message: 'Category Find Successfull',
            data: categoryData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.categoryDelete = async function (req, res, next) {
    try {
        let id = req.params.id

        let category = await CATEGORY.findById(id)
        if (!category) {
            throw new Error("Category not found");
        }

        await CATEGORY.findByIdAndDelete(id)
        res.status(200).json({
            status: 'Success',
            message: 'Category Delete Successfull',
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.categoryUpdate = async function (req, res, next) {
    try {
        let id = req.params.id
        let categoryData = await CATEGORY.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: 'Success',
            message: 'Category Update Successfull',
            data: categoryData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.categorySearch = async function (req, res, next) {
    try {
        let categoryData
        let searchCategory = req.query.searchTerm
        // console.log(searchCategory);

        if (searchCategory) {
            categoryData = await CATEGORY.find({
                $or: [
                    { category: { $regex: searchCategory, $options: "i" } }
                ]
            });
        } else {
            categoryData = await CATEGORY.find()
        }

        if(categoryData.length === 0){
            throw new Error("Category Not Found");
        }

        res.status(200).json({
            status: 'Success',
            message: "Category All Data Fetch Successfull",
            data: categoryData
        })
    } catch (error) {
        res.status(401).json({
            status: 'Fail',
            message: error.message
        })
    }
}


