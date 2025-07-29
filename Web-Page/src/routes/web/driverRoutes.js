import { Router } from 'express';
import { renderDriverTripsPage, renderMyTrips } from '../../controllers/web/driverController.js';

const router = new Router();

router.get('/trips', renderDriverTripsPage);
router.get('/my-trips', renderMyTrips);

export { router as driverRoutes };
