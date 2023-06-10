const mongoose = require('mongoose');

const projectionSchema = new mongoose.Schema({
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
  },
  cinemahall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CinemaHall',
  },
  price: Number,
  date: Date,
  time: String,
  capacity: Number,
});

const Projection = mongoose.model('Projection', projectionSchema);

module.exports = {Projection};