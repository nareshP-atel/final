const Session = require('../../models/Session');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { type, duration, taskId } = req.body;
        const session = new Session({
            user: req.user.id,
            type,
            duration,
            task: taskId
        });

        await session.save();
        res.status(201).json(session);
    } catch (err) {
        console.error('Error creating session:', err);
        res.status(500).json({ message: 'Server error while creating session' });
    }
};