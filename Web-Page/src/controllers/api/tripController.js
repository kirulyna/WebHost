import Trip from '../../models/tripModel.js';
import User from '../../models/userModel.js';

// GET /api/trips/:id - trip részletek JSON-ban
export async function getTripDetails(req, res) {
  try {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId)
      .populate('userID_driver')
      .populate('userID_boss');
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// POST /api/trips/:id/:userId/driver-note - driver note hozzáadása (JSON válasz)
export async function leaveDriverNote(req, res) {
  try {
    const tripId = req.params.id;
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user || user.role !== 'driver') {
      return res.status(403).json({ error: 'Access denied. Only drivers can leave notes.' });
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (typeof req.body.note !== 'undefined' && req.body.note !== '') {
      trip.contest = req.body.note;
    }

    await trip.save();
    res.json({ message: 'Driver note saved', trip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// POST /api/trips/:id/:userId/boss-note - boss note és penalty hozzáadása (JSON válasz)
export async function leaveBossNote(req, res) {
  try {
    const tripId = req.params.id;
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user || user.role !== 'boss') {
      return res.status(403).json({ error: 'Access denied. Only bosses can leave notes.' });
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (typeof req.body.note !== 'undefined' && req.body.note !== '') {
      trip.note = req.body.note;
    }
    if (typeof req.body.penaltyPoints !== 'undefined' && req.body.penaltyPoints !== '') {
      trip.penaltyPoints = req.body.penaltyPoints;
    }

    await trip.save();
    res.json({ message: 'Boss note and penalty saved', trip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}