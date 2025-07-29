import User from '../../models/userModel.js';
import Trip from '../../models/tripModel.js';
import jwt from 'jsonwebtoken';

export const renderMyDrivers = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.redirect('/auth/login?error=Access denied. Please log in.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'boss') {
      return res.redirect('/auth/login?error=Access denied. Only bosses can view this page');
    }

    const drivers = await User.find({ role: 'driver' });

    res.render('driverList', {
      title: 'My Drivers',
      user: {
        _id: user._id,
        name: user.name,
        username: decoded.username,
        role: user.role
      },
      drivers: drivers
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export const renderTripsPage = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.redirect('/auth/login?error=Access denied. Please log in.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'boss') {
      return res.redirect('/auth/login?error=Access denied. Only bosses can view this page');
    }

    const trips = await Trip.find({});

    res.render('trips', {
      title: 'All Trips',
      user: {
        _id: user._id,
        name: user.name,
        username: decoded.username,
        role: user.role
      },
      trips: trips
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
