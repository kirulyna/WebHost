import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  userID_driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userID_boss : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  contest: { type: String },
  penaltyPoints: { type: Number, default: 0 },
  note: { type: String },
  penaltyDate: { type: Date },

  // trip data
  total_run_time: { type: Number },
  looking_away_times: [{ type: Number }],
  asleep_times: [{ type: Number }],
  distracted_times: [{ type: Number }],
  tired_times: [{ type: Number }],

  // behavior statistics
  behavior_statistics: [
    {
      behavior_type: { type: String }, // 'asleep', 'looking_away', etc.
      count: { type: Number, default: 0 },
      total_duration: { type: Number, default: 0 }, // in seconds
      mean_duration: { type: Number, default: 0 }, // in seconds
      median_duration: { type: Number, default: 0 }, // in seconds
      std_duration: { type: Number, default: 0 }, // in seconds
      max_duration: { type: Number, default: 0 }, // in seconds
      percentile_75: { type: Number, default: 0 }, // in seconds
      percentile_90: { type: Number, default: 0 }, // in seconds
      percentile_95: { type: Number, default: 0 }, // in seconds
      trip_percentage: { type: Number, default: 0 }, // percentage of the trip time
      frequency: { type: Number, default: 0 }, // occurrences per hour
    }
  ],

  critical_events: [
    {
      event_type: { type: String, required: true }, // 'asleep', 'looking_away', etc.
      duration: { type: Number, default: 0 }
    }
  ],

  risk_analysis: {
    total_unsafe_time: { type: Number, default: 0 }, // in seconds
    unsafe_percentage: { type: Number, default: 0 }, // percentage of the trip
    total_events: { type: Number, default: 0 }, // total number of critical events
    risk_trend: { type: String }, // 'increasing', 'decreasing',
    risk_level: { type: String } // 'low', 'medium', 'high'
  }
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
