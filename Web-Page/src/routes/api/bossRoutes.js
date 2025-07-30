import express from 'express';
import { getAllBosses, getBossById, getMyDrivers, getMyTrips, addBoss, deleteBoss } from '../../controllers/api/bossController.js';

const router = express.Router();

router.get('/', getAllBosses);

router.post('/', addBoss);

router.get('/:bossId/drivers', getMyDrivers);

// Az adott boss összes tripje
router.get('/:bossId/trips', getMyTrips);

// Egy boss adatai
router.get('/:id', getBossById);
router.delete('/:id', deleteBoss);

export default router;
