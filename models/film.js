const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: String,
  director: String,
  length: Number,
  threeD: Boolean,
  rating: Number 
});

const Film = mongoose.model('Film', filmSchema);

module.exports = {Film};