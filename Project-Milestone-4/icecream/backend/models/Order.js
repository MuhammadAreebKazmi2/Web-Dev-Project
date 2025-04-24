const mongoose = require('mongoose');

// defining order schema
// Define the order schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String, // Add image URL for each item
      selectedBase: String,
      selectedToppings: [String]
    }
  ],
  subtotal: Number, // Items total before fees
  tax: Number,
  deliveryFee: Number,
  tip: Number,
  totalPrice: Number, // Final total (subtotal + tax + deliveryFee + tip)
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);
  