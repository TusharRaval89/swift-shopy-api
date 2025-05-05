let USER = require('../Model/users')
let bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');


exports.userSignup = async function (req, res, next) {
    try {
        let findEmail = await USER.findOne({ email: req.body.email })
        if (findEmail) {
            throw new Error("User Already Exists");
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)


        let userData = await USER.create(req.body)
        res.status(201).json({
            status: 'Success',
            message: 'User Signup Successfull',
            data: userData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.userLogin = async function (req, res, next) {
    try {
        let userData = await USER.findOne({ email: req.body.email })
        if (!userData) {
            throw new Error("User Not Found");
        }

        let checkPass = await bcrypt.compare(req.body.password, userData.password)
        if (!checkPass) {
            throw new Error("Please Enter Valid Password");
        }

        let token = jwt.sign({ id: userData._id }, 'USER_SECURE')

        res.status(200).json({
            status: 'Success',
            message: 'User Login Success',
            data: userData,
            token
        })

    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.allUserFind = async function (req, res, next) {
    try {

        let userData = await USER.find()
        if (userData.length == 0) {
            throw new Error("User Not Found");
        }
        res.status(200).json({
            status: 'Success',
            message: 'User All Data Fetch Successfull',
            data: userData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.oneUserFind = async function (req, res, next) {
    try {
        let id = req.params.id
        let userData = await USER.findById(id)
        res.status(200).json({
            status: 'Success',
            message: 'User Data Find Successfull',
            data: userData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.userDelete = async function (req, res, next) {
    try {

        let id = req.params.id

        let user = await USER.findById(id)
        if (!user) {
            throw new Error("User Already Delete");
        }

        await USER.findByIdAndDelete(id)
        res.status(200).json({
            status: 'Success',
            message: "User Delete Successfull",
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

// exports.userUpdate = async function (req, res, next) {
//     try {
//         req.body.password = await bcrypt.hash(req.body.password, 10)
//         let id = req.params.id
//         let userData = await USER.findByIdAndUpdate(id, req.body, { new: true })
//         res.status(200).json({
//             status: 'Success',
//             message: 'User Update Successfull',
//             data: userData
//         })
//     } catch (error) {
//         res.status(404).json({
//             status: 'Fail',
//             message: error.message
//         })
//     }
// }


// exports.userUpdate = async function (req, res, next) {
//     try {
//         let id = req.params.id;

//         console.log("req.body :- ", req.body);
//         console.log("req.file :- ", req.file);

//         let updateData = { ...req.body };

//         if (req.file) {
//             const profileUrl = await uploadToCloudinary(req.file.buffer, 'users');
//             updateData.profileImg = profileUrl;
//         }

//         let userData = await USER.findByIdAndUpdate(id, updateData, {
//             new: true,
//             runValidators: true
//         });

//         res.status(200).json({
//             status: 'Success',
//             message: 'User Updated successfully',
//             data: userData
//         })
//     } catch (error) {
//         res.status(500).json({
//             status: 'Fail',
//             message: error.message
//         })
//     }
// }

exports.userUpdate = async function (req, res, next) {
    try {
        let id = req.params.id;
        let updateData = { ...req.body };

        if (req.file) {
            console.log(req.file);
            updateData.profileImg = req.file.filename; // just the filename or full path if needed
        }

        let userData = await USER.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'Success',
            message: 'User Updated successfully',
            data: userData
        });
    } catch (error) {
        res.status(500).json({
            status: 'Fail',
            message: error.message
        });
    }
}

exports.getUserProfile = async function (req, res, next) {
    try {
        let token = req.headers.authorization
        // console.log(token);

        if (!token) {
            throw new Error("Please Attach Token");
        }

        let tokenVerify = jwt.verify(token, 'USER_SECURE')
        if (!tokenVerify) {
            throw new Error("Invalid Token");
        }

        let userVerify = await USER.findById(tokenVerify.id)

        if (!userVerify) {
            throw new Error("User Not Found");
        }

        res.status(200).json({
            status: 'Success',
            message: 'User Profile Get Successfully',
            data: userVerify
        })

    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}
