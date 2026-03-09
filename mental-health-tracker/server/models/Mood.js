const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    note: {
        type: String,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }]
}, { timestamps: true });

module.exports = mongoose.model('Mood', moodSchema);