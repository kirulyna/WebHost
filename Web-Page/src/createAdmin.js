import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/userModel.js';
import Credentials from './models/credentialsModel.js';
import dotenv from 'dotenv';

dotenv.config();

// Csatlakozás az adatbázishoz
mongoose.connect(process.env.MONGODB_URI);

async function createAdmin() {
  try {
    // Ellenőrizd, hogy létezik-e már
    const existingUser = await User.findOne({ email: 'admin@company.com' });
    if (existingUser) {
      console.log('Admin already exists!');
      process.exit(0);
    }

    // Hozd létre a user-t
    const user = new User({
      name: 'Boti',
      phoneNumber: '123456789',
      dateOfBirth: new Date('2000-01-01'),
      cnp: '1234567890123',
      role: 'admin'
    });
    await user.save();

    // Hozd létre a credentials-t
    const credentials = new Credentials({
      userID: user._id,
      email: 'admin@company.com',
      username: 'admin',
      password: 'admin123',
      recoveryCode: Math.random().toString(36).substring(2, 15),
    });
    await credentials.save();

    console.log('Admin user created successfully!');
    console.log('Email: admin@company.com');
    console.log('Password: admin123');
    console.log('Role: admin');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
