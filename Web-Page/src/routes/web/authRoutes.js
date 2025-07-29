import { Router } from 'express'
import { renderRegisterPage, renderLoginPage, registerUser, loginUser, logoutUser } from '../../controllers/web/authController.js';
import { requireAdmin } from '../../middleware/authMiddleware.js';

const router = new Router();

router.get('/register', requireAdmin, renderRegisterPage);
router.get('/login', renderLoginPage);

router.post('/register', requireAdmin, registerUser);
router.post('/login', loginUser);

router.post('/logout', logoutUser);

export { router as authRoutes };
