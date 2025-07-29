import Trip from './models/tripModel.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const dummyTrip = new Trip({
  userID_driver: '6880a146dabfc2ff3b5b6c31',
  userID_boss: '6880a10ddabfc2ff3b5b6c28',
  date: new Date('2024-08-05T14:45:00Z'),
  contest: '',
  penaltyPoints: 5,
  note: '',
  penaltyDate: new Date('2024-08-06T09:00:00Z'),

  // trip data
  total_run_time: 3600, // 1 óra, másodpercben
  looking_away_times: [4.2, 2.9, 3.7],
  asleep_times: [0.0, 0.0],
  distracted_times: [2.5, 3.0, 1.9, 2.2],
  tired_times: [1.0, 1.5],

  // behavior statistics
  behavior_statistics: [
    {
      behavior_type: 'looking_away',
      count: 3,
      total_duration: 10.8,
      mean_duration: 3.6,
      median_duration: 3.7,
      std_duration: 0.65,
      max_duration: 4.2,
      percentile_75: 3.95,
      percentile_90: 4.2,
      percentile_95: 4.2,
      trip_percentage: 0.18,
      frequency: 3.0,
    },
    {
      behavior_type: 'distracted',
      count: 4,
      total_duration: 9.6,
      mean_duration: 2.4,
      median_duration: 2.35,
      std_duration: 0.45,
      max_duration: 3.0,
      percentile_75: 2.75,
      percentile_90: 3.0,
      percentile_95: 3.0,
      trip_percentage: 0.27,
      frequency: 4.0,
    },
    {
      behavior_type: 'tired',
      count: 2,
      total_duration: 2.5,
      mean_duration: 1.25,
      median_duration: 1.25,
      std_duration: 0.25,
      max_duration: 1.5,
      percentile_75: 1.38,
      percentile_90: 1.5,
      percentile_95: 1.5,
      trip_percentage: 0.07,
      frequency: 2.0,
    },
    {
      behavior_type: 'asleep',
      count: 0,
      total_duration: 0,
      mean_duration: 0,
      median_duration: 0,
      std_duration: 0,
      max_duration: 0,
      percentile_75: 0,
      percentile_90: 0,
      percentile_95: 0,
      trip_percentage: 0,
      frequency: 0,
    }
  ],

  // safety score results
  safety_score: {
    overall_safety_score: 68,
    duration_score: 70,
    frequency_score: 65,
    severity_score: 69,
    safety_category: 'low'
  },

  critical_events: [
    { event_type: 'distracted', duration: 3.0 },
    { event_type: 'looking_away', duration: 4.2 }
  ],

  risk_analysis: {
    total_unsafe_time: 22.9,
    unsafe_percentage: 0.38,
    total_events: 9,
    risk_trend: 'increasing',
    risk_level: 'high'
  }
});

// Mentés adatbázisba:
await dummyTrip.save();
console.log('Another dummy trip saved!');