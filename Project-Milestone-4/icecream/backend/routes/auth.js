const express = require('express');
const router = express.Router();
const User = require('../models/User');

//register a new user
router.post('/register', async (req, res) => {
  const { username, password, email, dob } = req.body;

  try {
    //check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    //save new user
    const newUser = new User({ username, password, email, dob });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//login existing user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return the user data with _id
    res.json({ 
      message: 'Login successful',
      user: {
        _id: user._id,  // Make sure to include this
        username: user.username,
        email: user.email
        // Don't include password
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
