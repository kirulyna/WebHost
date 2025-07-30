import express from 'express';
import { getAllUsers } from '../../controllers/api/adminController.js';
// Ha szeretnéd, ide is tehetsz requireAdmin middleware-t, ha van tokenes auth
import { getAllBosses } from '../../controllers/api/bossController.js';
const router = express.Router();

// Összes user lekérése
router.get('/users', getAllUsers);

// User törlése
//router.delete('/users/:id', deleteUser);

// Összes boss lekérése
router.get('/bosses', getAllBosses);

export default router;