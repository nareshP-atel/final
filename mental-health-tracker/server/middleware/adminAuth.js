const isAdmin = async (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                success: false,
                message: 'Access denied: Admin only'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error checking admin status'
        });
    }
};

module.exports = isAdmin;