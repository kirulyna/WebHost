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

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: 'driver' });
    res.json(drivers);
  } catch (err) {
    console.error('Get drivers error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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

// Delete /api/drivers/:id
export const deleteDriver = async (req, res) => {
  try {
    const driver = await User.findById(req.params.id);
    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ error: 'Driver not found' });
    }

    await Credentials.deleteOne({ userID: driver._id });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Driver deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/drivers
export const addDriver = async (req, res) => {
  try {
    const { name, username, phoneNumber, email, dateOfBirth, cnp, password, confirmPassword } = req.body;

    if (!name || !username || !phoneNumber || !email || !dateOfBirth || !cnp || !password || !confirmPassword) {
      return res.status(400).json({ error: 'Please fill all fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const userExists = await User.findOne({ cnp });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const emailExists = await Credentials.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = new User({
      name,
      phoneNumber,
      dateOfBirth,
      cnp,
      role: 'driver',
    });
    await user.save();

    const credentials = new Credentials({
      userID: user._id,
      email,
      username,
      password,
      recoveryCode: Math.random().toString(36).substring(2, 15),
    });
    await credentials.save();

    const token = generateToken(user._id, credentials._id, credentials.username);

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        cnp: user.cnp,
        username: credentials.username,
        email: credentials.email,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
