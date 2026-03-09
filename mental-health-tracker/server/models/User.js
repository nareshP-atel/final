const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
        index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true 
});

// Pre-save middleware to handle duplicate email errors
userSchema.post('save', function(error, doc, next) {
    if (error.code === 11000 && error.keyPattern.email) {
        next(new Error('Email already exists'));
    } else {
        next(error);
    }
});

// Remove password when converting to JSON
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
};

// Clear existing indexes and create new ones
mongoose.connection.once('open', async () => {
    try {
        await mongoose.model('User').collection.dropIndexes();
        await mongoose.model('User').collection.createIndex({ email: 1 }, { unique: true });
    } catch (error) {
        console.error('Index management error:', error);
    }
});

module.exports = mongoose.model('User', userSchema);