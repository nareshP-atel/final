const mongoose = require('mongoose');

const focusSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    endTime: {
        type: Date
    },
    duration: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['focus', 'break'],
        default: 'focus'
    },
    task: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('FocusSession', focusSessionSchema);