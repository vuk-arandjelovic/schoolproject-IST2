const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: String,
  director: String,
  // Add more fields as per your requirements
});

const Film = mongoose.model('Film', filmSchema);

module.exports = {Film};