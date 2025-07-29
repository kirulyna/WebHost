import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';

export const getMainInfo = async (req, res) => {
  try {
    let user = null;

    // Token lehet a headerben (mobil appnál tipikus)
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const dbUser = await User.findById(decoded.userId);

      if (dbUser) {
        user = {
          _id: dbUser._id,
          name: dbUser.name,
          username: decoded.username,
          role: dbUser.role,
        };
      }
    }

    res.json({
      message: 'Welcome to the Mobile API Main Page!',
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};