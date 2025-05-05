let PRODUCT = require('../Model/product');
let CATEGORY = require('../Model/category')
const cloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');
const REVIEW = require('../Model/review');

const uploadToCloudinary = async (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder }, (error, result) => {
            if (error) reject(error);
            else {
                console.log('result.secure_url :- ', result.secure_url)
                resolve(result.secure_url)
            };
        }).end(fileBuffer);
    });
};

exports.productCreate = async function (req, res, next) {
    try {
        const { title, description, price, discountPrice, category, rating, highestPurchase, brandId } = req.body;

        if (!title) {
            throw new Error("title is required");
        }
        if (!description) {
            throw new Error("description is required");
        }
        if (!price) {
            throw new Error("price is required");
        }
        if (!discountPrice) {
            throw new Error("discountPrice is required");
        }
        if (!category) {
            throw new Error("category is required");
        }
        if (!rating) {
            throw new Error("rating is required");
        }
        if (!highestPurchase) {
            throw new Error("highestPurchase is required");
        }
        if (!brandId) {
            throw new Error("Brand is required");
        }

        console.log('req.body :- ', req.body)

        // Validate category ID
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Invalid category ID'
            });
        }

        if (!mongoose.Types.ObjectId.isValid(brandId)) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Invalid Brand ID'
            });
        }

        if (!req.files['thumbnail'] || req.files['thumbnail'].length === 0) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Thumbnail is required'
            });
        }

        const thumbnailFile = req.files['thumbnail'][0];
        const thumbnailUrl = await uploadToCloudinary(thumbnailFile.buffer, 'products');

        const imageUrls = [];
        if (req.files['images']) {
            const imageFiles = req.files['images'];
            if (imageFiles.length > 4) {
                return res.status(400).json({
                    status: 'Fail',
                    message: 'You can upload a maximum of 4 images'
                });
            }
            for (const file of imageFiles) {
                const imageUrl = await uploadToCloudinary(file.buffer, 'products');
                imageUrls.push(imageUrl);
            }
        }

        const discountPercentage = ((price - discountPrice) / price * 100).toFixed(2);

        let payload = {
            thumbnail: thumbnailUrl,
            images: imageUrls,
            title,
            description,
            price,
            discountPrice,
            discountPercentage,
            rating,
            highestPurchase,
            category,
            brandId
        }

        const result = await PRODUCT.create(payload);
        console.log('result :- ', result)

        // 🔥 Fetch product again to populate the 'category' field
        const populatedProduct = await PRODUCT.findById(result._id).populate('category', 'category').populate('brandId');

        res.status(201).json({
            status: 'Success',
            message: 'Product created successfully',
            product: populatedProduct
        });

    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        });
    }
};

exports.AllproductFind = async function (req, res, next) {
    try {

        let productData = await PRODUCT.find().populate('category').populate('brandId')
        if (productData.length == 0) {
            throw new Error("Product Not Found");
        }

        res.status(200).json({
            status: 'Success',
            message: 'All Prodcut Fetch Successull',
            data: productData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.oneproductFind = async function (req, res, next) {
    try {
        let id = req.params.id
        let productData = await PRODUCT.findById(id).populate('category').populate('brandId')

        res.status(200).json({
            status: 'Success',
            message: 'Prodcut Find Successull',
            data: productData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.productDelete = async function (req, res, next) {
    try {
        let id = req.params.id
        let findProduct = await PRODUCT.findById(id)
        if (!findProduct) {
            throw new Error("Product Not Define");
        }
        await PRODUCT.findByIdAndDelete(id)
        res.status(200).json({
            status: 'Success',
            message: 'Product Delete Successfull'
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.productUpdate = async function (req, res, next) {
    try {
        let id = req.params.id;

        console.log("req.body :- ", req.body);
        console.log("req.files :- ", req.files);

        let updateData = { ...req.body };

        // 🖼️ Handle thumbnail if provided
        if (req.files?.thumbnail) {
            const thumbnailFile = req.files.thumbnail[0];
            const thumbnailUrl = await uploadToCloudinary(thumbnailFile.buffer, 'products');
            updateData.thumbnail = thumbnailUrl;  // Save Cloudinary URL instead of filename
        }

        // 🖼️ Handle images array if provided
        if (req.files?.images) {
            const imageUrls = [];
            for (const file of req.files.images) {
                const imageUrl = await uploadToCloudinary(file.buffer, 'products');
                imageUrls.push(imageUrl);
            }
            updateData.images = imageUrls;  // Save array of Cloudinary URLs
        }

        // ⚠️ Optional: Recalculate discountPercentage if price/discountPrice are updated
        if (updateData.price && updateData.discountPrice) {
            updateData.discountPercentage = ((updateData.price - updateData.discountPrice) / updateData.price * 100).toFixed(2);
        }

        let productData = await PRODUCT.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'Success',
            message: 'Product updated successfully',
            data: productData
        });

    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        });
    }
};


exports.productSearch = async function (req, res, next) {
    try {
        let searchProduct = req.query.searchTerm
        let productData
        // console.log(serchProduct);
        if (searchProduct) {
            productData = await PRODUCT.find({
                $or: [
                    { title: { $regex: searchProduct, $options: "i" } }
                ]
            });
        } else {
            productData = await PRODUCT.find()
        }

        // if (productData.length === 0) {
        //     throw new Error("Product Not Found");
        // }
        res.status(200).json({
            status: 'Success',
            message: 'Product All Data Fetch Successfull',
            data: productData,
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}


// exports.productFilter = async function (req, res, next) {
//     try {
//         const { category, brandId, minPrice, maxPrice, rating } = req.query;
//         const filter = {};

//         // Category filter
//         if (category && mongoose.Types.ObjectId.isValid(category)) {
//             filter.category = category;
//         }

//         // Brand filter
//         if (brandId && mongoose.Types.ObjectId.isValid(brandId)) {
//             filter.brandId = brandId;
//         }

//         // Discount Price filters
//         if (isNaN(minPrice) || isNaN(maxPrice)) {
//             filter.discountPrice = {};
//             if (minPrice) filter.discountPrice.$gte = parseFloat(minPrice);
//             if (maxPrice) filter.discountPrice.$lte = parseFloat(maxPrice);
//         }

//         // Rating filter
//         if (isNaN(rating)) {
//             console.log('Is rating :- ', rating)
//             const ratingNumber = parseInt(rating);
//             const ratedReviews = await REVIEW.find({ ratingCount: ratingNumber }, 'productId');

//             const productIds = ratedReviews.map(review => review.productId.toString());

//             // If no products match the rating, return empty
//             if (productIds.length === 0) {
//                 return res.status(200).json({
//                     status: 'Success',
//                     message: 'No products found matching the filters',
//                     data: []
//                 });
//             }

//             filter._id = { $in: productIds };
//         }

//         console.log('Applied Filter:', filter);

//         const productData = await PRODUCT.find(filter)
//             .populate('category')
//             .populate('brandId');

//         if (productData.length === 0) {
//             return res.status(404).json({
//                 status: "Fail",
//                 message: "No products found matching the filters"
//             });
//         }

//         res.status(200).json({
//             status: 'Success',
//             message: 'Filtered products fetched successfully',
//             data: productData
//         });

//     } catch (error) {
//         res.status(500).json({
//             status: "Fail",
//             message: error.message
//         });
//     }
// };



exports.productFilter = async function (req, res, next) {
    try {
        const { category, brandId, minPrice, maxPrice, rating } = req.query;
        const filter = {};

        // ✅ Category filter
        if (category && mongoose.Types.ObjectId.isValid(category)) {
            filter.category = category;
        }

        // ✅ Brand filter
        if (brandId && mongoose.Types.ObjectId.isValid(brandId)) {
            filter.brandId = brandId;
        }

        // ✅ Discount Price filters
        if (!isNaN(minPrice) || !isNaN(maxPrice)) {
            filter.discountPrice = {};
            if (!isNaN(minPrice)) filter.discountPrice.$gte = parseFloat(minPrice);
            if (!isNaN(maxPrice)) filter.discountPrice.$lte = parseFloat(maxPrice);
        }

        // ✅ Rating filter (fixed logic)
        const ratingNumber = parseInt(rating);
        if (!isNaN(ratingNumber)) {
            const ratedReviews = await REVIEW.find({ ratingCount: ratingNumber }, 'productId');

            const productIds = ratedReviews.map(review => review.productId.toString());

            // If no products match the rating, return empty
            if (productIds.length === 0) {
                return res.status(200).json({
                    status: 'Success',
                    message: 'No products found matching the filters',
                    data: []
                });
            }

            filter._id = { $in: productIds };
        }

        console.log('Applied Filter:', filter);

        // ✅ Fetch products with populated fields
        const productData = await PRODUCT.find(filter)
            .populate('category')
            .populate('brandId');

        if (productData.length === 0) {
            return res.status(200).json({
                status: 'Success',
                message: 'No Products Found.',
                data: []
            });
        }

        res.status(200).json({
            status: 'Success',
            message: 'Filtered products fetched successfully',
            data: productData
        });

    } catch (error) {
        console.error('Error in productFilter:', error);
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
};




