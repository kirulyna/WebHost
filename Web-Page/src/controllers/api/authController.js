import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';
import Credentials from '../../models/credentialsModel.js';

const generateToken = (userId, credentialsId, username) => {
  return jwt.sign(
    { userId, credentialsId, username },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, username, phoneNumber, email, dateOfBirth, cnp, password, confirmPassword, role } = req.body;

    if (!name || !username || !phoneNumber || !email || !dateOfBirth || !cnp || !password || !confirmPassword || !role) {
      return res.status(400).json({ error: 'Please fill all fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const userExists = await User.findOne({ cnp });
    if (userExists) {
      return res.status(400).json({ error: 'User already in the system' });
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
      role,
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
      message: 'Employee registered successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: credentials.username,
        email: credentials.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    const credentials = await Credentials.findOne({ email });

    if (!credentials) {
      return res.status(401).json({ error: 'Invalid email or password!' });
    }

    const isPasswordValid = await credentials.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password!' });
    }

    const user = await User.findById(credentials.userID);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = generateToken(user._id, credentials._id, credentials.username);

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: credentials.username,
        email: credentials.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/auth/logout (opcionális, csak frontend oldali token törlés kell)
export const logoutUser = (req, res) => {
  // Mobilon általában csak a token törlése a frontend oldalon elég
  res.json({ message: 'Logged out.' });
};