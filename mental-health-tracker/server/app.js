require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const authRoutes = require('./routes/api/v1/auth.routes');
const journalRoutes = require('./routes/api/v1/journal.routes');
const productivityRoutes = require('./routes/api/v1/productivity.routes');
const insightsRoutes = require('./routes/api/v1/insights.routes');
const communityRoutes = require('./routes/api/v1/community.routes'); // Add this line

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    console.log('Request:', req.method, req.path);
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/journal', journalRoutes);
app.use('/api/v1/productivity', productivityRoutes);
app.use('/api/v1/insights', insightsRoutes);
app.use('/api/v1/community', communityRoutes); // Add this line

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});