const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    moods: {
        happy: { type: Number, default: 0 },
        neutral: { type: Number, default: 0 },
        sad: { type: Number, default: 0 },
        anxious: { type: Number, default: 0 }
    },
    productivity: {
        focusMinutes: { type: Number, default: 0 },
        completedTasks: { type: Number, default: 0 }
    },
    journalEntries: { type: Number, default: 0 }
});

module.exports = mongoose.model('UserStats', userStatsSchema);