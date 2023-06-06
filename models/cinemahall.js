const mongoose = require('mongoose');

const cinemaHallSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  // Add more fields as per your requirements
});

const CinemaHall = mongoose.model('CinemaHall', cinemaHallSchema);

module.exports = {CinemaHall};