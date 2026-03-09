const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    }
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    type: {
        type: String,
        enum: ['success', 'challenge', 'tip', 'question'],
        default: 'general'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [commentSchema],
    anonymous: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);