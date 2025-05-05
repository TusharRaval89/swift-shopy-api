require('dotenv').config();  // This will load .env file

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   // ✅ Correct - reading from .env
    api_key: process.env.CLOUDINARY_API_KEY,         // ✅ Correct - reading from .env
    api_secret: process.env.CLOUDINARY_API_SECRET    // ✅ Correct - reading from .env
});

module.exports = cloudinary;
