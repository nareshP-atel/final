const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    notifications: {
        type: Boolean,
        default: true
    },
    darkMode: {
        type: Boolean,
        default: false
    },
    focusDuration: {
        type: Number,
        default: 25,
        min: 1,
        max: 60
    },
    breakDuration: {
        type: Number,
        default: 5,
        min: 1,
        max: 30
    }
});

module.exports = mongoose.model('Settings', settingsSchema);