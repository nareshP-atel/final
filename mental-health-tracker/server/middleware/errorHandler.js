const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // MongoDB Validation Error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    // MongoDB Duplicate Key Error
    if (err.code === 11000) {
        return res.status(400).json({
            message: 'Duplicate field value entered'
        });
    }

    // JWT Authentication Error
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }

    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler;