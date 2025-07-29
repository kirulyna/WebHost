import express from 'express';
import { getBossById, getMyDrivers, getMyTrips, getAllBosses, addBoss } from '../../controllers/api/bossController.js';

const router = express.Router();

// Összes boss
router.get('/', getAllBosses);

// Boss add
router.post('/', addBoss);

// Egy boss adatai
router.get('/:id', getBossById);

// Az adott boss összes drivere
router.get('/:bossId/drivers', getMyDrivers);

// Az adott boss összes tripje
router.get('/:bossId/trips', getMyTrips);

export default router;