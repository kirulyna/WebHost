import express from 'express';
import { getDriverById, getDriverTrips } from '../../controllers/api/driverControler.js';

const router = express.Router();

// Egy driver adatai
router.get('/:id', getDriverById);

// Egy driver összes tripje
router.get('/:driverId/trips', getDriverTrips);

export default router;