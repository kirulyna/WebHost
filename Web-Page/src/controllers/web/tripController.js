import Trip from '../../models/tripModel.js';
import User from '../../models/userModel.js';

export async function getTripDetails(req, res) {
  try {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId)
        .populate('userID_driver')
        .populate('userID_boss');
    if (!trip) {
      return res.status(404).send('Trip not found');
    }

    res.render('singleTrip', {
      title: 'Trip Details',
      trip: trip,
      query: req.query,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export async function leaveDriverNote(req, res) {
  try {
    const tripId = req.params.id;
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user || user.role !== 'driver') {
      return res.status(403).send('Access denied. Only drivers can leave notes.');
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).send('Trip not found');
    }

    if (typeof req.body.note !== 'undefined' && req.body.note !== '') {
      trip.contest = req.body.note;
      console.log('Van contest:', trip.contest);
    }
    console.log('aware');

    await trip.save();
    res.redirect(`/trips/${tripId}/${userId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export async function leaveBossNote(req, res) {
  try {
    const tripId = req.params.id;
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user || user.role !== 'boss') {
      return res.status(403).send('Access denied. Only bosses can leave notes.');
    }
    const { note } = req.body.note;
    const penalty = req.body.penalty;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).send('Trip not found');
    }

    if (typeof req.body.note !== 'undefined' && req.body.note !== '') {
      trip.note = req.body.note;
    }
    if (typeof req.body.penaltyPoints !== 'undefined' && req.body.penaltyPoints !== '') {
      trip.penaltyPoints = req.body.penaltyPoints;
    }

    await trip.save();
    res.redirect(`/trips/${tripId}/${userId}?success=penalty`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
