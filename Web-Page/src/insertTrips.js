// insertTestTrips.js
import mongoose from 'mongoose';
import Trip from './models/tripModel.js'; // Állítsd be a helyes elérési utat!
import User from './models/userModel.js'; // Állítsd be a helyes elérési utat!

const MONGODB_URI = 'mongodb://localhost:27017/driver-management'; // Cseréld ki a sajátodra!

async function insertTestTrips() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Csatlakozva az adatbázishoz!');

    // Keresünk két user-t (driver és boss)
    const driver = await User.find().findOne({ role: 'driver' });
    const boss = await User.find().findOne({ role: 'boss' });

    // Teszt trip-ek
    const trips = [
      {
        userID_driver: driver._id,
        userID_boss: boss._id,
        date: new Date('2024-07-01'),
        contest: 'Summer Rally',
        penaltyPoints: 2,
        note: 'Good trip',
      },
      {
        userID_driver: boss._id,
        userID_boss: driver._id,
        date: new Date('2024-07-10'),
        contest: 'Night Race',
        penaltyPoints: 0,
        note: 'No issues',
      },
      {
        userID_driver: driver._id,
        userID_boss: boss._id,
        date: new Date('2024-07-15'),
        contest: 'City Tour',
        penaltyPoints: 1,
        note: 'Minor delay',
        penaltyDate: new Date('2024-07-16'),
      },
    ];

    // Beszúrás
    await Trip.insertMany(trips);
    console.log('Teszt trip-ek beszúrva!');
  } catch (err) {
    console.error('Hiba:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Kapcsolat bontva.');
  }
}

insertTestTrips();