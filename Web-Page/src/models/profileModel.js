import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
