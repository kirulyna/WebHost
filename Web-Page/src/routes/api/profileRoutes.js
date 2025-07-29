import express from 'express';
import { getUserProfile } from '../../controllers/api/profileController.js';

const router = express.Router();

// GET /api/profiles/:id - user profil JSON-ban
router.get('/:id', getUserProfile);

export default router;