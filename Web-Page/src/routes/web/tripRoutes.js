import { Router } from 'express';
import { getTripDetails, leaveDriverNote, leaveBossNote } from '../../controllers/web/tripController.js';

const router = new Router();

router.get('/trips/:id/:userId', getTripDetails);
router.post('/trips/:id/:userId/driver-note', leaveDriverNote);
router.post('/trips/:id/:userId/boss-note', leaveBossNote);

export { router as tripRoutes };
