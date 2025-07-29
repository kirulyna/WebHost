import { Router } from 'express';
import { renderDriverProfile, renderBossProfile } from '../../controllers/web/profileController.js';

const router = new Router();

router.get('/:id', renderDriverProfile);

export { router as profileRoutes };
