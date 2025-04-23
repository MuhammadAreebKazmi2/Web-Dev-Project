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

router.put('/update/:userId', async (req, res) => {
  // Allow updating fullName and password
  const { fullName, password } = req.body;
  const { userId } = req.params;

  // Basic validation
  if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
  }
  // Ensure at least one field is being updated
  if (!fullName && !password) {
      return res.status(400).json({ message: 'No update information provided (fullName or password)' });
  }


  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if they are provided in the request body
    if (fullName) {
        user.fullName = fullName;
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
             fullName: updatedUser.fullName,
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


// Fetch user details (return fullName)
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Exclude password from the result using .select()
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return relevant user details
    res.json({
      _id: user._id, // Good practice to return ID as well
      fullName: user.fullName,
      email: user.email,
      dob: user.dob
    });
  } catch (err) {
    console.error("Fetch User Error:", err);
    res.status(500).json({ message: 'Server error fetching user data' });
  }
});

module.exports = router;
