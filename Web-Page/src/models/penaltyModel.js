import mongoose from 'mongoose';

const penaltySchema = new mongoose.Schema({
  tripID: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  note: { type: String, required: true },
  penaltyPoints: { type: Number, required: true },
});

const Penalty = mongoose.model('Penalty', penaltySchema);

export default Penalty;
