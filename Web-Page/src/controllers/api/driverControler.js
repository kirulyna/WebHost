import User from '../../models/userModel.js';
import Trip from '../../models/tripModel.js';

// GET /api/drivers/:id - egy driver adatai JSON-ban
export const getDriverById = async (req, res) => {
  try {
    const driver = await User.findById(req.params.id);
    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/drivers/:driverId/trips - adott driver összes tripje JSON-ban
export const getDriverTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userID_driver: req.params.driverId });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};