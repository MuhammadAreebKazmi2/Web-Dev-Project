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

router.put('/update/:userId', async (req, res) => {
  // Allow updating fullName and password
  const { username, password } = req.body;
  const { userId } = req.params;

  // Basic validation
  if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
  }
  // Ensure at least one field is being updated
  if (!username && !password) {
      return res.status(400).json({ message: 'No update information provided (username or password)' });
  }


  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if they are provided in the request body
    if (username) {
        user.username = username;
    }
    if (password) {
        // Again, hash the password in a real application before saving
        user.password = password;
    }

    const updatedUser = await user.save();

    // Return updated user info (excluding password)
    res.status(200).json({
        message: 'User updated successfully',
        user: {
             _id: updatedUser._id,
             username: updatedUser.username,
             email: updatedUser.email
         }
     });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: 'Server error during update' });
  }
});

// Delete user account (no change needed here regarding identifiers)
router.delete('/delete/:userId', async (req, res) => {
  const { userId } = req.params;

   if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: 'Server error during deletion' });
  }
});


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
