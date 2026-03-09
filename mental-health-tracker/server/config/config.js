const config = {
    development: {
        mongodb_uri: 'mongodb://127.0.0.1:27017/mental-health-tracker',
        jwt_secret: 'your_dev_secret',
        cors_origin: 'http://localhost:3000'
    },
    production: {
        mongodb_uri: process.env.MONGODB_URI,
        jwt_secret: process.env.JWT_SECRET,
        cors_origin: process.env.CORS_ORIGIN
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];