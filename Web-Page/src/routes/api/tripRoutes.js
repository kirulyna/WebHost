import express from 'express';
import { getTripDetails, leaveDriverNote, leaveBossNote } from '../../controllers/api/tripController.js';

const router = express.Router();

// Trip részletek
router.get('/:id', getTripDetails);

// Driver note hozzáadása
router.post('/:id/:userId/driver-note', leaveDriverNote);

// Boss note és penalty hozzáadása
router.post('/:id/:userId/boss-note', leaveBossNote);

export default router;