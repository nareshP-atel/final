const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/community', require('./community.routes'));
router.use('/journals', require('./journal.routes'));
router.use('/tasks', require('./task.routes'));
router.use('/moods', require('./mood.routes'));
router.use('/insights', require('./insights.routes'));

module.exports = router;