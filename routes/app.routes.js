const { Router } = require('express');
const sessionsRouter = require('./sessions.routes');

const router = Router();

// App Routes
router.use('/sessions', sessionsRouter);


module.exports = router;