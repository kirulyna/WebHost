import User from '../../models/userModel.js';
import Credentials from '../../models/credentialsModel.js';
import jwt from 'jsonwebtoken';

export const renderRemovePage = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.redirect('/?error=Access denied. Only admin can register users');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'admin') {
      return res.redirect('/?error=Access denied. Only admin can register users');
    }

    console.log('Remove route accessed by admin');
    res.render('removeEmployee', {
      title: 'Remove Employee',
      user: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export const removeEmployee = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log('Removing user with ID:', userId);  // debug

    const user = await User.findById(userId);
    console.log('User found:', user); // debug
    if (!user) {
      return res.render('removeEmployee', {
        title: 'Remove Employee',
        error: 'User not found'
      });
    }

    await User.findByIdAndDelete(userId);
    await Credentials.deleteOne({ userID: userId });

    return res.render('removeEmployee', {
      title: 'Remove Employee',
      message: 'Employee removed successfully'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

export const renderManagePage = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.redirect('/?error=Access denied. Only admin can register users');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'admin') {
      return res.redirect('/?error=Access denied. Only admin can manage users');
    }

    console.log('Manage route accessed by admin');
    res.render('manageEmployees', {
      title: 'Manage Employees',
      user: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export const renderBossesPage = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.redirect('/?error=Access denied. Only admin can view bosses');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'admin') {
      return res.redirect('/?error=Access denied. Only admin can view bosses');
    }

    const bosses = await User.find({ role: 'boss' });

    console.log('Bosses route accessed by admin');
    res.render('renderBosses', {
      title: 'Bosses',
      user: user,
      bosses: bosses
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
