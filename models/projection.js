const mongoose = require('mongoose');

const projectionSchema = new mongoose.Schema({
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
  },
  price: Number,
  date: Date,
  time: String,
  // Add more fields as per your requirements
});

const Projection = mongoose.model('Projection', projectionSchema);

module.exports = {Projection};