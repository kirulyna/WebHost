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

/* rendering */
export const renderRegisterPage = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.redirect('/auth/login?error=Access denied. Only admin can register users');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'admin') {
      return res.redirect('/auth/login?error=Access denied. Only admin can register users');
    }

    console.log('Register route accessed by admin');
    res.render('register', {
      title: 'Register New Employee',
      user: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export const renderLoginPage = async (req, res) => {
  try {
    console.log('Login route accessed');
    res.render('login', {
      title: 'Login Page',
      user: null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export const registerUser = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.redirect('/auth/login?error=Access denied. Only admin can register users');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminUser = await User.findById(decoded.userId);

    if (!adminUser || adminUser.role !== 'admin') {
      return res.redirect('/auth/login?error=Access denied. Only admin can register users');
    }

    const { name, username, phoneNumber, email, dateOfBirth, cnp, password, confirmPassword, role } = req.body;

    if (!name || !username || !phoneNumber || !email || !dateOfBirth || !cnp || !password || !confirmPassword || !role) {
      return res.redirect('/auth/register?error=Please fill all fields');
    }

    if (password !== confirmPassword) {
      return res.render('register', {
        title: 'Register New Employee',
        user: adminUser,
        error: 'Passwords do not match'
      }
      );
    }

    const userExists = await User.findOne({ cnp });
    if (userExists) {
      return res.render('register', {
        title: 'Register New Employee',
        user: adminUser,
        error: 'User already in the system'
      });
    }

    const emailExists = await Credentials.findOne({ email });

    if (emailExists) {
      return res.render('register', {
        title: 'Register New Employee',
        user: adminUser,
        error: 'Email already exists'
      });
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
      recoveryCode: Math.random().toString(36).substring(2, 15), // simple random recovery code
    });
    await credentials.save();

    console.log('New user registered by admin:', user._id, username);
    return res.render('register', {
      title: 'Register New Employee',
      user: adminUser,
      message: 'Employee registered successfully'
    });
  } catch (err) {
    console.error(err);
    return res.redirect('/auth/register?error=Internal Server Error');
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.redirect('/auth/login?error=Please fill all fields');
  }

  try {
    const credentials = await Credentials.findOne({ email });

    if (!credentials) {
      return res.render('login', {
        title: 'Login Page',
        error: 'Invalid email!'
      });
    }

    const isPasswordValid = await credentials.comparePassword(password);

    if (!isPasswordValid) {
      return res.render('login', {
        title: 'Login Page',
        error: 'Invalid password!'
      });
    }

    const user = await User.findById(credentials.userID);

    if (!user) {
      return res.redirect('/auth/login?error=User not found');
    }

    console.log('User logged in:', user._id, user.name);

    const token = generateToken(user._id, credentials._id, credentials.username);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.redirect('/');
  } catch (err) {
    console.error(err);
    return res.redirect('/auth/login?error=Internal Server Error');
  }
};

export const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.redirect('/auth/login?message=Logged out.');
};
