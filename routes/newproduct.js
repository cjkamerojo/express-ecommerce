const express = require('express');
const router = express.Router();
const multer = require('multer');
/*
const cloudinary = require('cloudinary').v2;
const cloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage;;
*/
const { Product } = require('../models');
const upload = require('../config/multer');

/* GET NEW PRODUCT PAGE. */
router.get('/', function(req, res, next) {
  res.render('newproduct', { title: 'Add a New Product!' });
});


// Handle form submissions for adding a new product
router.post('/', upload.single('imageUpload'), async (req, res) => {
  try {
    const { name, price, description, stockQuantity, imageUrl } = req.body;
    const image_url = req.file ? req.file.path : imageUrl;

    // Create a new product with the image URL
    const product = await Product.create({
      name,
      price,
      description,
      stockQuantity,
      image_url,
    });

    // Save the product to the database
    //await product.save();

    res.json({ success: true, product: product });
    //res.redirect('/home');
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
