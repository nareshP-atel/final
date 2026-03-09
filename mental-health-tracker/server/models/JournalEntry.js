const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  aiMood: {
    type: String
  },
  tags: [{
    type: String,
    trim: true
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JournalEntry', journalEntrySchema);