const router = require('express').Router();
const auth = require('../../../middleware/auth');
const Settings = require('../../../models/Settings');

// Get user settings
router.get('/', auth, async (req, res) => {
    try {
        let settings = await Settings.findOne({ user: req.userId });
        
        if (!settings) {
            // Create default settings if none exist
            settings = new Settings({
                user: req.userId,
                journalReminders: {
                    enabled: true,
                    frequency: 'daily',
                    time: '20:00'
                },
                mentalHealthPreferences: {
                    moodTracking: true,
                    anxietyTracking: true,
                    sleepTracking: false,
                    stressTracking: true
                },
                focusSettings: {
                    sessionDuration: 25,
                    breakDuration: 5,
                    dailyGoal: 4
                },
                privacy: {
                    shareJournalEntries: false,
                    shareMoodStats: false,
                    shareProgress: true
                }
            });
            await settings.save();
        }
        
        res.json(settings);
    } catch (err) {
        console.error('Error fetching settings:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;