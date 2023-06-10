const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  projection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projection',
  },
  email: String,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = {Reservation};