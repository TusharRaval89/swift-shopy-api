let CONTACT = require('../Model/contact')
let nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
});

async function main(userEmail, subject, message) {
    const info = await transporter.sendMail({
      from: userEmail, 
      to:  process.env.RECEIVER_EMAIL,
      subject: subject, 
      text: message, 
    });

    console.log("Message sent: %s", info.messageId);
}

exports.contactCreate = async function (req, res, next) {
    try {
        const { userId, subject, message } = req.body

        const payload = {
            userId,
            subject,
            message
        }

        const contactData = await CONTACT.create(payload)
        const populateContact = await CONTACT.findById(contactData._id).populate('userId')
        const userEmail = populateContact?.userId?.email;

        if (userEmail) {
            await main(userEmail, subject, message);  
        } else {
            console.log("User email not found!");
        }

        res.status(200).json({
            status: 'Success',
            message: 'Customer Feedback Successfully',
            data: populateContact
        })

    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.contactGetAll = async function (req,res,next) {
    try {
        let contactData = await CONTACT.find().populate('userId')
        res.status(200).json({
            status:'Success',
            message:"All Customer Feedback Fetched Successfully",
            data:contactData
        })
    } catch (error) {
        res.status(404).json({
            status:'Fail',
            message:error.message
        })
    }
}
