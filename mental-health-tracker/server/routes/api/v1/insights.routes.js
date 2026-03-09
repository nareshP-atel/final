const router = require('express').Router();
const mongoose = require('mongoose');
const FocusSession = require('../../../models/FocusSession');
const auth = require('../../../middleware/auth');

// Get productivity insights
router.get('/productivity', auth, async (req, res) => {
    try {
        const today = new Date();
        const weekAgo = new Date(today.setDate(today.getDate() - 7));

        const sessions = await FocusSession.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user.userId),
                    startTime: { $gte: weekAgo },
                    status: 'completed'
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$startTime' } },
                    totalMinutes: { $sum: '$completedMinutes' },
                    sessionsCount: { $sum: 1 },
                    averageCompletion: { 
                        $avg: { $divide: ['$completedMinutes', '$duration'] }
                    }
                }
            },
            { $sort: { '_id': 1 } }
        ]);

        res.json({
            success: true,
            stats: {
                daily: sessions,
                summary: {
                    totalSessions: sessions.reduce((acc, day) => acc + day.sessionsCount, 0),
                    totalMinutes: sessions.reduce((acc, day) => acc + day.totalMinutes, 0),
                    averageCompletion: Math.round(
                        sessions.reduce((acc, day) => acc + day.averageCompletion, 0) / sessions.length * 100
                    )
                }
            }
        });

    } catch (error) {
        console.error('Productivity insights error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch productivity insights'
        });
    }
});

module.exports = router;