import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Credentials from '../models/credentialsModel.js';
import { name } from 'ejs';

export const protectAndSetUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      console.log('No token found');  // debug
      req.user = null;
      res.locals.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).lean();
    if (!user) {
      console.log('User not found'); // debug
      req.user = null;
      res.locals.user = null;
      return next();
    }

    const credentials = await Credentials.findOne({ userID: user._id }).lean();

    const userData = {
      _id: user._id,
      name: user.name,
      role: user.role,
      username: credentials?.username || user.name,
      email: credentials?.email || 'No email',
    };

    req.user = userData;
    res.locals.user = userData;
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
  return next();
};

export const setUserLocals = (req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
  } else {
    res.locals.user = null;
  }

  res.locals.currentPath = req.path;
  return next();
};

export const requireAuth = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.redirect(`/auth/login?message=${encodeURIComponent('Please log in to access this page')}`);
};

export function requireBoss(req, res, next) {
  if (req.user && req.user.role === 'boss') return next();
  return res.status(403).send('No authorization!');
};

export function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).send('No authorization!');
};
