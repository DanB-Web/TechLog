// const { response } = require('express');

const router = require('express').Router();
const reports = require('./controllers/reports.controller');
const authMiddleware = require('./middlewares/auth');

//Reports routes
router.get('/allreports', reports.allReports);

router.get('/getreport/:id', reports.getReport);

router.post('/postreport', reports.newReport);

router.patch('/editreport', authMiddleware, reports.editReport);

router.delete('/deletereport/:id', authMiddleware, reports.deleteReport);

module.exports = router;
