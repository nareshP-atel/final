const router = require('express').Router();
const auth = require('../../../middleware/auth');
const Mood = require('../../../models/Mood');

// Get all moods for the user
router.get('/', auth, async (req, res) => {
    try {
        const moods = await Mood.find({ user: req.userId })
            .sort({ timestamp: -1 })
            .limit(30);
        res.json(moods);
    } catch (err) {
        console.error('Error fetching moods:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Record new mood
router.post('/', auth, async (req, res) => {
    try {
        const { value, note, tags } = req.body;

        const newMood = new Mood({
            user: req.userId,
            value,
            note,
            tags
        });

        const savedMood = await newMood.save();
        res.status(201).json(savedMood);
    } catch (err) {
        console.error('Error recording mood:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get mood statistics
router.get('/stats', auth, async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const stats = await Mood.aggregate([
            {
                $match: {
                    user: req.userId,
                    timestamp: { $gte: thirtyDaysAgo }
                }
            },
            {
                $group: {
                    _id: null,
                    averageMood: { $avg: '$value' },
                    totalEntries: { $sum: 1 },
                    highestMood: { $max: '$value' },
                    lowestMood: { $min: '$value' }
                }
            }
        ]);

        res.json(stats[0] || {
            averageMood: 0,
            totalEntries: 0,
            highestMood: 0,
            lowestMood: 0
        });
    } catch (err) {
        console.error('Error fetching mood stats:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;