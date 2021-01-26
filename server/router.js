// const { response } = require('express');

const router = require('express').Router();
const reports = require('./controllers/reports.controller');
const authMiddleware = require('./middlewares/auth');

//Reports routes
router.get('/reports', reports.allReports);

router.get('/reports/:id', reports.getReport);

router.post('/reports', reports.newReport);

router.put('/reports', reports.editReport);

router.delete('/reports/:id', authMiddleware, reports.deleteReport);

module.exports = router;
