import express from 'express';
import { getDriverById, getDriverTrips, addDriver, deleteDriver, getAllDrivers } from '../../controllers/api/driverControler.js';

const router = express.Router();

router.get('/', getAllDrivers);
router.post('/', addDriver);
// Egy driver adatai
router.get('/:id', getDriverById);

// Egy driver összes tripje
router.get('/:driverId/trips', getDriverTrips);

// Egy driver törlése
router.delete('/:id', deleteDriver);

export default router;