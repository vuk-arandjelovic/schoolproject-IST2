const express = require('express');
const router = express.Router();
const { Reservation } = require("../models");

// returns all reservations
router.get('/', async (req, res) => {
  const reservations = await Reservation.find().populate('projection');
  res.json(reservations);
});
// inserts reservation into database
router.post('/', async (req, res) => {
  const reservation = new Reservation(req.body);
  try {
    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// updates reservation from database by id
router.put('/:id', async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// deletes reservation from database by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    res.json(deletedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;