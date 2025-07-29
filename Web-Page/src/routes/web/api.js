import express from 'express';
import Trip from '../../models/tripModel.js';

const router = express.Router();

router.get('/drivers/:driverId/trips', async (req, res) => {
  try {
    const trips = await Trip.find({ userID_driver: req.params.driverId });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
