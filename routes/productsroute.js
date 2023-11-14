const express = require('express');
const router = express.Router();
const { Product } = require('../models/..');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

/*
// Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const newProduct = await Product.create({ name, price, stock });
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
*/


// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    const updatedProduct = await Product.update(
      { name, price, stock },
      { where: { id } }
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.send('Product deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;