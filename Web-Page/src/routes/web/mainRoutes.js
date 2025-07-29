import { Router } from 'express';
import { renderIndexPage } from '../../controllers/web/mainPageController.js'
import { protectAndSetUser } from '../../middleware/authMiddleware.js';

const router = new Router();

router.use(protectAndSetUser);

router.get('/', renderIndexPage);

export { router as mainRoutes };
