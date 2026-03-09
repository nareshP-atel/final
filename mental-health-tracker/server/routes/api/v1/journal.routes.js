const router = require('express').Router();
const Journal = require('../../../models/Journal');
const auth = require('../../../middleware/auth');

// Create journal entry
router.post('/', auth, async (req, res) => {
    try {
        console.log('Received journal data:', req.body); // Debug log
        console.log('User from token:', req.user); // Debug log

        const journal = new Journal({
            userId: req.user.userId,
            title: req.body.title,
            content: req.body.content,
            mood: req.body.mood,
            tags: req.body.tags || []
        });

        const savedJournal = await journal.save();
        console.log('Saved journal:', savedJournal); // Debug log

        res.status(201).json({
            success: true,
            journal: savedJournal,
            message: 'Journal entry created successfully'
        });

    } catch (error) {
        console.error('Journal creation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating journal entry'
        });
    }
});

// Get journal entries
router.get('/', auth, async (req, res) => {
    try {
        console.log('Fetching entries for user:', req.user.userId); // Debug log

        const journals = await Journal.find({ userId: req.user.userId })
            .sort({ createdAt: -1 });

        console.log('Found journals:', journals.length); // Debug log

        res.json({
            success: true,
            journals
        });

    } catch (error) {
        console.error('Journal fetch error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching journal entries'
        });
    }
});

module.exports = router;