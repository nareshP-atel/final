const JournalEntry = require('../../models/JournalEntry');
const analyzeText = require('../../utils/textAnalysis');

module.exports = async (req, res) => {
    try {
        const { mood, content, tags } = req.body;

        // Optional: Analyze content for AI mood insights
        const aiMood = await analyzeText(content);

        const entry = new JournalEntry({
            user: req.user.id,
            mood,
            content,
            tags,
            aiMood
        });

        await entry.save();

        res.status(201).json({
            success: true,
            data: entry
        });
    } catch (err) {
        console.error('Error creating journal entry:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to create journal entry'
        });
    }
};