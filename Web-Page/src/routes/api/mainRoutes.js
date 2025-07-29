import express from 'express';
import { getMainInfo } from '../../controllers/api/mainPageController.js';

const router = express.Router();

// GET /api/main - főoldal vagy user info JSON-ban
router.get('/', getMainInfo);

export default router;