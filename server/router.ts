import {Router} from 'express';
import * as reportController from './controllers/reports.controller';
import authMiddleware from './middlewares/auth';

const router = Router();
//Reports routes
router.get('/allreports', reportController.allReports);

router.get('/getreport/:id', reportController.getReport);

router.post('/postreport', reportController.newReport);

router.patch('/editreport', authMiddleware, reportController.editReport);

router.delete('/deletereport/:id', authMiddleware, reportController.deleteReport);

export default router;
