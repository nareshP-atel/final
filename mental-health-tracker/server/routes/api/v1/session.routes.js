const router = require('express').Router();
const auth = require('../../../middleware/auth');
const Session = require('../../../models/Session');

// Start new session
router.post('/start', auth, async (req, res) => {
    try {
        const session = new Session({
            user: req.userId,
            type: req.body.type || 'work',
            duration: req.body.duration || 25
        });
        await session.save();
        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Complete session
router.put('/:id/complete', auth, async (req, res) => {
    try {
        const session = await Session.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { completed: true },
            { new: true }
        );
        res.json(session);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;