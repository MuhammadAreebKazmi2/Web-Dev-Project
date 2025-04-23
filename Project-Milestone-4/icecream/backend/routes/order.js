const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const MenuItem = require('../models/Menu'); // Add this at the top with other imports

// Test route to verify API is working
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
  console.log("hello");
});

const User = require('../models/User');

router.post('/place-order', async (req, res) => {
  const { userId, items, subtotal, tax, deliveryFee, tip, totalPrice } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const itemsWithImages = items.map(item => ({
      ...item,
      image: item.img || '',  // Use img from cart or empty string
      selectedBase: item.selectedBase || '',
      selectedToppings: item.selectedToppings || []
    }));

    const newOrder = new Order({
      userId,
      items: itemsWithImages,
      subtotal,
      tax,
      deliveryFee,
      tip,
      totalPrice,
      createdAt: new Date()
    });

    await newOrder.save();
    res.status(201).json({ 
      message: 'Order placed successfully!', 
      order: newOrder 
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
});


// Get all orders for a specific user
router.get('/user-orders/:userId', async (req, res) => {
  console.log('Received request for user orders:', req.params.userId); // Debug log
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .exec();
    console.log('Found orders:', orders.length); // Debug log
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      message: 'Error fetching orders', 
      error: error.message 
    });
  }
});

module.exports = router;
