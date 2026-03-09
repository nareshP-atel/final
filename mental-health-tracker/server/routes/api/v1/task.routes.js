const router = require('express').Router();
const auth = require('../../../middleware/auth');
const Task = require('../../../models/Task');

// Create task
router.post('/', auth, async (req, res) => {
    try {
        const task = new Task({
            user: req.userId,
            title: req.body.title,
            priority: req.body.priority,
            dueDate: req.body.dueDate
        });
        
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId })
            .sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;