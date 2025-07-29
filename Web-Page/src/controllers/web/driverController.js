import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';
import Trip from '../../models/tripModel.js';

export const renderDriverTripsPage = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.redirect('/auth/login?error=Access denied. Please log in.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'driver') {
      return res.redirect('/auth/login?error=Access denied. Only drivers can view this page');
    }

    const trips = await Trip.find({ userID: user._id });

    res.render('driverTrips', {
      title: 'Your Trips',
      user: user,
      trips: trips
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export const renderMyTrips = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.redirect('/auth/login?error=Access denied. Please log in.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'driver') {
      return res.render('/', {
        title: 'Access Denied',
        error: 'Access denied. Only drivers can view this page'
      });
    }

    const trips = await Trip.find({ userID_driver: user._id });

    res.render('myTrips', {
      title: 'My Trips',
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
