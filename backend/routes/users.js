const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const generateTokenForUser = require('../utils/jwt'); 
require('dotenv').config();

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email,password } = req.body;
    try {
    const hashedPassword = await bcrypt.hash(password, 10);     
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send(newUser);
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
   const user = await User.findOne({ username });
   if (!user) {
       return res.status(404).json({ error: 'Invalid credentials' });
   }
    
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
       return res.status(401).json({ error: 'Invalid credentials' });
   }
    const token = generateTokenForUser(user._id); 
    console.log(token);// generate after checking password
    res.status(200).json({ token, message: 'Login successful', user });
   // check if profile is completed
   if (!user.profileCompleted) {
       return res.status(200).json({ message: 'Please complete your profile' , user});
   }
   res.status(200).json({ message: 'Login successful', user });
});

// Update user profile
router.put('/:id/profile', async (req, res) => {
  try {
    const { goals } = req.body;
    const { fullname, age, gender, height, weight } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { goals, fullname, age, gender, height, weight, profileCompleted: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;