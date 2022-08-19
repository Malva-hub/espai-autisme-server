

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({

  cloudinary,
  params: {
    allow_formats: ['jpg', 'png'],
    folder: 'espai_autisme' 
  }
});


module.exports = multer({ storage });
