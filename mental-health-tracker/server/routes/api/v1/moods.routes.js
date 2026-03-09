const router = require('express').Router();
const auth = require('../../../middleware/auth');
const Mood = require('../../../models/Mood');

router.get('/', auth, async (req, res) => {
    try {
        // Get moods for the authenticated user
        const moods = await Mood.find({ userId: req.user.userId })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            moods
        });
    } catch (error) {
        console.error('Get moods error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch moods'
        });
    }
});

module.exports = router;