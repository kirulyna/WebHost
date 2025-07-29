import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';

export const renderIndexPage = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    let user = null;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const dbUser = await User.findById(decoded.userId);

      console.log('Decoded user:', decoded.userId);
      console.log('Database user:', dbUser);

      if (dbUser) {
        user = {
          _id: dbUser._id,
          name: dbUser.name,
          username: decoded.username,
          role: dbUser.role
        };
      }
    }

    console.log('Main route accessed, you are in index.ejs');
    res.render('index', {
      title: 'Main Page',
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
