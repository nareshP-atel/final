const Session = require('../../models/Session');

module.exports = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user.id })
            .populate('task', 'text category')
            .sort({ completedAt: -1 });
            
        res.json(sessions);
    } catch (err) {
        console.error('Error fetching sessions:', err);
        res.status(500).json({ message: 'Server error while fetching sessions' });
    }
};