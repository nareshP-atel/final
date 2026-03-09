const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (user) {
            return res.status(400).json({ 
                message: 'User already exists' 
            });
        }

        // Create new user
        user = new User({
            username,
            email,
            password
        });

        await user.save();

        // Create JWT token
        const payload = {
            user: {
                id: user.id,
                username: user.username
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
};