const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/', async (req, res) => {
    const { username, goals, password } = req.body;
    const newUser = new User({ username, goals, password });
    await newUser.save();
    res.status(201).send('User created');
});

module.exports = router;