const mongoose = require('mongoose');

const cinemaHallSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  threeD: Boolean
});

const CinemaHall = mongoose.model('CinemaHall', cinemaHallSchema);

module.exports = {CinemaHall};