const Entry = require('../models/Entry');
const { validateMoodEntry } = require('../utils/validators');

const createEntry = async (req, res) => {
    try {
        const { errors, isValid } = validateMoodEntry(req.body);
        
        if (!isValid) {
            return res.status(400).json({ errors });
        }

        const newEntry = new Entry({
            user: req.user.userId,
            moodScore: req.body.moodScore,
            note: req.body.note
        });

        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        res.status(500).json({ error: 'Error creating entry' });
    }
};

const getEntries = async (req, res) => {
    try {
        const entries = await Entry.find({ user: req.user.userId })
            .sort({ date: -1 });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching entries' });
    }
};

module.exports = {
    createEntry,
    getEntries
};