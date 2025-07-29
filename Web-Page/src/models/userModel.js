import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    cnp: {
      type: String,
      required: [true, 'CNP is required'],
      unique: true,
    },
    role : { type: String, enum: ['driver', 'boss', 'admin'] },
});

const User = mongoose.model('User', userSchema);

export default User;
