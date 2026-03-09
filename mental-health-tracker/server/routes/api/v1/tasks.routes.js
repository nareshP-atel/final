const Task = require('../../../models/Task');
const router = require('express').Router();
const auth = require('../../../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        // Get tasks for the authenticated user
        const tasks = await Task.find({ userId: req.user.userId })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            tasks
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tasks'
        });
    }
});

module.exports = router;