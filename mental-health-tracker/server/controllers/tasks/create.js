const Task = require('../../models/Task');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { text, category, priority, dueDate } = req.body;
        const task = new Task({
            user: req.user.id,
            text,
            category,
            priority,
            dueDate
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ message: 'Server error while creating task' });
    }
};