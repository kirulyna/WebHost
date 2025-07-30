import { Router } from 'express';
import { requireAdmin } from '../../middleware/authMiddleware.js';
import { renderRemovePage, removeEmployee, renderBossesPage, renderManagePage } from '../../controllers/web/adminController.js';
import { renderBossProfile } from '../../controllers/web/profileController.js';

const router = new Router();

router.get('/remove-employee', requireAdmin, renderRemovePage);
router.post('/remove-employee', requireAdmin, removeEmployee);
router.get('/manage-employees', requireAdmin, renderManagePage);
router.get('/bosses', requireAdmin, renderBossesPage);
router.get('/bosses/:id', requireAdmin, renderBossProfile);

export { router as adminRoutes };