const JournalEntry = require('../../models/JournalEntry');

module.exports = async (req, res) => {
    try {
        const entries = await JournalEntry.find({ user: req.user.id })
            .sort({ date: -1 })
            .limit(20);

        res.json({
            success: true,
            count: entries.length,
            data: entries
        });
    } catch (err) {
        console.error('Error fetching journal entries:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch journal entries'
        });
    }
};