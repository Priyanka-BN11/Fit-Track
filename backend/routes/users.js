const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

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
   // check if profile is completed
   if (!user.profileCompleted) {
       return res.status(200).json({ message: 'Please complete your profile' , user});
   }
   res.status(200).json({ message: 'Login successful', user });
});

// Update user profile
router.put('/:id/profile', async (req, res) => {
    const { goals } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id);
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.goals = goals;
        user.profileCompleted = true; // Mark profile as completed
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;