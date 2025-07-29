import User from '../../models/userModel.js';
import Trip from '../../models/tripModel.js';

// GET /api/bosses/:id - egy boss adatai JSON-ban
export const getBossById = async (req, res) => {
  try {
    const boss = await User.findById(req.params.id);
    if (!boss || boss.role !== 'boss') {
      return res.status(404).json({ error: 'Boss not found' });
    }
    res.json(boss);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/bosses/:bossId/drivers - az összes driver JSON-ban (akiket a boss lát)
export const getMyDrivers = async (req, res) => {
  try {
    // Itt lehetne szűrni, hogy csak a boss-hoz tartozó drivereket adja vissza, ha van ilyen logika
    const drivers = await User.find({ role: 'driver' });
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/bosses/:bossId/trips - az összes trip JSON-ban (amit a boss lát)
export const getMyTrips = async (req, res) => {
  try {
    // Itt lehetne szűrni, hogy csak a boss-hoz tartozó tripeket adja vissza, ha van ilyen logika
    const trips = await Trip.find({});
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllBosses = async (req, res) => {
  try {
    const bosses = await User.find({ role: 'boss' });
    res.json(bosses);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/bosses - új boss hozzáadása
export const addBoss = async (req, res) => {
  try {
    const { name, username, email, phoneNumber, dateOfBirth, cnp, password } = req.body;
    // Itt érdemes validálni az adatokat!
    const boss = new User({
      name,
      username,
      email,
      phoneNumber,
      dateOfBirth,
      cnp,
      password, // csak ha a model várja!
      role: 'boss'
    });
    await boss.save();
    res.status(201).json(boss);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};