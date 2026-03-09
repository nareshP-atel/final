const router = require('express').Router();
const FocusSession = require('../../../models/FocusSession');
const auth = require('../../../middleware/auth');

// Get all sessions for user
router.get('/sessions', auth, async (req, res) => {
    try {
        console.log('Fetching sessions for user:', req.user.userId);

        const sessions = await FocusSession.find({ 
            userId: req.user.userId 
        })
        .sort({ startTime: -1 }) // Most recent first
        .limit(10); // Limit to last 10 sessions

        console.log('Found sessions:', sessions.length);

        res.json({
            success: true,
            sessions
        });
    } catch (error) {
        console.error('Get sessions error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch sessions'
        });
    }
});

// Start focus session
router.post('/session/start', auth, async (req, res) => {
    try {
        console.log('Received session request:', req.body); // Debug log

        const session = new FocusSession({
            userId: req.user.userId,
            duration: req.body.duration,
            type: req.body.type
        });

        await session.save();
        console.log('Session created:', session); // Debug log

        res.status(201).json({
            success: true,
            session
        });
    } catch (error) {
        console.error('Start session error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to start session'
        });
    }
});

// Complete session route
router.patch('/session/:id/complete', auth, async (req, res) => {
    try {
        console.log('Completing session:', req.params.id); // Debug log

        const session = await FocusSession.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.userId,
                status: { $ne: 'completed' }
            },
            {
                status: 'completed',
                endTime: new Date(),
                completedMinutes: req.body.completedMinutes || 0
            },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found or already completed'
            });
        }

        res.json({
            success: true,
            session,
            message: 'Session completed successfully'
        });
    } catch (error) {
        console.error('Complete session error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to complete session'
        });
    }
});

module.exports = router;