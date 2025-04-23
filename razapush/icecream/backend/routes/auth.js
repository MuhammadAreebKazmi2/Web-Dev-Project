const express = require('express');
const router = express.Router();
const User = require('../models/User');

//register a new user
// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, email, dob } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Save the new user
    const newUser = new User({ username, password, email, dob });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


//login existing user
// Login existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;  // Use email instead of username

  try {
    const user = await User.findOne({ email });  // Search by email

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return the user data with _id
    res.json({ 
      message: 'Login successful',
      user: {
        _id: user._id,  // Include user ID
        username: user.username,  // Include username
        email: user.email  // Include email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user information (username and password)
router.put('/update/:userId', async (req, res) => {  // Add '/update/'
  const { username, password } = req.body;
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username;
    user.password = password || user.password;

    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user account
router.delete('/delete/:userId', async (req, res) => {  // Added '/delete/'
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Fetch user details
// Change this route:
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ 
      username: user.username, 
      email: user.email, 
      dob: user.dob 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
