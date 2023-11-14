const express = require('express');
const router = express.Router();
const { Cart } = require('./models/..');

// Get all carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.findAll();
    res.json(carts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Create a new cart
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    const newCart = await Cart.create({ userId });
    res.json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update a cart
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, status } = req.body;
    const updatedCart = await Cart.update(
      { userId, status },
      { where: { id } }
    );
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete a cart
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.destroy({ where: { id } });
    res.send('Cart deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;