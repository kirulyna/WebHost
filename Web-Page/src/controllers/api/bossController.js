import User from '../../models/userModel.js';
import Trip from '../../models/tripModel.js';
import Credentials from '../../models/credentialsModel.js';
import jwt from 'jsonwebtoken';


const generateToken = (userId, credentialsId, username) => {
  return jwt.sign(
    { userId, credentialsId, username },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

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

// GET /api/bosses - összes boss JSON-ban
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
    console.log('Add boss eleje');
    const { name, username, email, phoneNumber, dateOfBirth, cnp, password, confirmPassword } = req.body;

    if (!name || !username || !email || !phoneNumber || !dateOfBirth || !cnp || !password || !confirmPassword) {
      return res.status(400).json({ error: 'Please fill all fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match!' });
    }

    const bossExists = await User.findOne({ cnp });
    if (bossExists) {
      return res.status(400).json({ error: 'Boss already exists!' });
    }

    const emailExists = await Credentials.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already in use!' });
    }

    const boss = new User({
      name,
      phoneNumber,
      dateOfBirth,
      cnp,
      role: 'boss'
    });
    const savedBoss = await boss.save();
    console.log('User-ben lementve');

    const credentials = new Credentials({
      userID: boss._id,
      email,
      username,
      password,
      recoveryCode: Math.random().toString(36).substring(2, 15),
    });

    console.log('Saving credentials for boss:', username);
    const savedCredentials = await credentials.save();
    console.log('Credentials saved successfully for boss:', username);
    
    const token = generateToken(savedBoss._id, savedCredentials._id, username);
    console.log('New boss registered:', boss._id, username);

    res.status(201).json({
      token,
      user: {
        _id: savedBoss._id,
        name: savedBoss.name,
        phoneNumber: savedBoss.phoneNumber,
        dateOfBirth: savedBoss.dateOfBirth,
        cnp: savedBoss.cnp,
        role: savedBoss.role,
        username: username,
        email: email,
        credentialsId: savedCredentials._id
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBoss = async (req, res) => {
  try {
    const boss = await User.findById(req.params.id);
    if (!boss || boss.role !== 'boss') {
      return res.status(404).json({ error: 'Boss not found' });
    }

    await Credentials.deleteOne({ userID: boss._id });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Boss deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
