import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function resetDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Töröld az egész users collection-t
    await mongoose.connection.db.collection('users').drop();
    console.log('Users collection dropped');
    
    // Töröld a credentials collection-t is
    await mongoose.connection.db.collection('credentials').drop();
    console.log('Credentials collection dropped');
    
    console.log('Database reset complete. You can now create users again.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase();
