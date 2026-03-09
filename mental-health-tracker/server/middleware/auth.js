const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // Check for Authorization header
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Authorization header missing'
            });
        }

        // Verify token format
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format'
            });
        }

        // Extract and verify token
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.userId) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token payload'
            });
        }

        // Add user info to request
        req.user = { userId: decoded.userId };
        console.log('Authenticated user:', req.user); // Debug log
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            success: false,
            message: error.name === 'JsonWebTokenError' ? 'Invalid token' : 'Authentication failed'
        });
    }
};

module.exports = auth;