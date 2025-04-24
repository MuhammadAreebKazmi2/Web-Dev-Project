const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');
const mongoose = require('mongoose');


// 1. Enhanced MongoDB Connection
const MONGODB_URI = 'mongodb+srv://ejza34038:sFWIcelZ3HmiD6Zj@practicemongo.lqgpv.mongodb.net/?retryWrites=true&w=majority&appName=practicemongo';

const connectWithRetry = () => {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('MongoDB Connected to database:', mongoose.connection.name);
      
      // Verify the menu collection exists
      mongoose.connection.db.listCollections({name: 'MenuItems'}).toArray((err, collections) => {
        if (err) {
          console.error('Error checking collections:', err);
          return;
        }
        
        if (collections.length === 0) {
          console.error('Collection "menu" not found in database');
        } else {
          console.log('Found collection:', collections[0].name);
          console.log('Document count:', collections[0].count);
        }
      });
    })
    .catch(err => {
      console.error('MongoDB Connection Error:', err.message);
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// 4. Enhanced Menu Endpoint
router.get('/menu', async (req, res) => {  // Note: Typo fixed from '/api/me' to '/api/menu'
    try {
      if (!mongoose.connection.readyState) {
        return res.status(503).json({ error: 'Database not connected' });
      }
  
      const items = await MenuItem.find().lean();
      
      if (!items || items.length === 0) {
        console.warn('No items found in menu collection');
        // Try direct collection access as fallback
        const nativeItems = await mongoose.connection.db.collection('MenuItems').find().toArray();
        return res.json(nativeItems);
      }
  
      res.json(items);
    } catch (err) {
      console.error('Database Error:', err);
      res.status(500).json({ 
        error: err.message,
        advice: 'Check server logs and database connection'
      });
    }
  });
  
module.exports = router;