const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage;;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Functioning Cloudinary Scrambled Name
const storage = new cloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'myapp',
    public_id: (req, file) => file.originalname.split('.')[0],
    format: (req, file) => file.mimetype.split('/')[1],
  },
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

// Multer Middleware:

const upload = multer({ storage: storage });



module.exports = upload;