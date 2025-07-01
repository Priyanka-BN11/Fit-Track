const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    goals: {
        type: String,
        default: '', // Allow goals to be optional
    },
    profileCompleted:{
        type: Boolean,
        default: false, // Default to false, indicating profile is not completed
    },
    createdAt:{
        type: Date,
        default: Date.now, // Automatically set the creation date
    }
   
});

module.exports = mongoose.model('User', userSchema);