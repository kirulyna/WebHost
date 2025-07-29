import { Router } from 'express';
import { renderMyDrivers, renderTripsPage } from '../../controllers/web/bossController.js';
import { requireAdmin } from '../../middleware/authMiddleware.js';

const router = new Router();

router.get('/my-drivers', renderMyDrivers);
router.get('/trips', renderTripsPage);

// GET /api/bosses/:id - JSON valasz mobilapphoz
router.get('/:id', async (req, res) => {
  try {
    const boss = await User.findById(req.params.id);
    if (!boss || boss.role !== 'boss') {
      return res.status(404).json({ error: 'Boss not found' });
    }
    res.json(boss);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as bossRoutes };
