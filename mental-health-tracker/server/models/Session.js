const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: Date,
    duration: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);