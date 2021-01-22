import {Router} from 'express';
import * as reportController from './controllers/reports.controller';

const router = Router();
//Reports routes
router.get('/allreports', reportController.allReports);

router.get('/getreport/:id', reportController.getReport);

router.post('/postreport', reportController.newReport);

router.patch('/editreport', reportController.editReport);

router.delete('/deletereport/:id', reportController.deleteReport);

export default router;
