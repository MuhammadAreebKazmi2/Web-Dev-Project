const mongoose = require('mongoose');

// 3. Schema and Model
const menuSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    img: String,
    category: String
  }, { collection: 'MenuItems' });
  
module.exports = mongoose.model('MenuItems', menuSchema);
  