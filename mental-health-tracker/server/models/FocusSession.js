const mongoose = require('mongoose');

const focusSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    completedMinutes: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'interrupted'],
        default: 'active'
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    },
    type: {
        type: String,
        enum: ['focus', 'break'],
        default: 'focus'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('FocusSession', focusSessionSchema);