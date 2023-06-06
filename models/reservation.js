const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  projection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projection',
  },
  // Add more fields as per your requirements
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = {Reservation};