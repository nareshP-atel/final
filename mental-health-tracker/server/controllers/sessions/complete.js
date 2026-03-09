const Session = require('../../models/Session');
const Task = require('../../models/Task');

module.exports = async (req, res) => {
    try {
        const session = await Session.findOne({ 
            _id: req.params.id, 
            user: req.user.id 
        });

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Update session completion
        session.completedAt = new Date();
        await session.save();

        // If session is linked to a task, increment pomodoro count
        if (session.task && session.type === 'work') {
            await Task.findByIdAndUpdate(session.task, {
                $inc: { pomodoros: 1 }
            });
        }

        res.json(session);
    } catch (err) {
        console.error('Error completing session:', err);
        res.status(500).json({ message: 'Server error while completing session' });
    }
};