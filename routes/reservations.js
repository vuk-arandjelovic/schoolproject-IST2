const express = require('express');
const router = express.Router();
const { Reservation, Projection } = require("../models");

// returns all reservations
router.get('/', async (req, res) => {
  const reservations = await Reservation.find().populate('projection');
  res.json(reservations);
});
// inserts reservation into database
router.post('/', async (req, res) => {
  try {
    const { projectionId, email } = req.body;
    
    const projection = await Projection.findById(projectionId);
    if (!projection) {
      return res.status(404).json({ error: 'Projection not found' });
    }
    if (projection.capacity <= 0) {
      return res.status(400).json({ error: 'Projection is full' });
    }
    
    const reservation = new Reservation({
      projection: projectionId,
      email,
    });

    projection.capacity--;

    await Promise.all([reservation.save(), projection.save()]);

    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
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