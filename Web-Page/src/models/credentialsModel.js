import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const credentialsSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  recoveryCode: { type: String, required: true },
});

// password hashing
credentialsSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

credentialsSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Credentials = mongoose.model('Credentials', credentialsSchema);

export default Credentials;
