const express = require('express');
const router = express.Router();
const { CinemaHall } = require("../models");

// returns all cinemahalls
router.get('/', async (req, res) => {
  const cinemaHalls = await CinemaHall.find();
  res.json(cinemaHalls);
});

// inserts cinemahall into database
router.post('/', async (req, res) => {
  const cinemaHall = new CinemaHall(req.body);
  try {
    const savedCinemaHall = await cinemaHall.save();
    res.status(201).json(savedCinemaHall);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// updates cinemahall from database by id
router.put('/:id', async (req, res) => {
  try {
    const updatedCinemaHall = await CinemaHall.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCinemaHall);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// deletes cinemahall from database by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCinemaHall = await CinemaHall.findByIdAndDelete(req.params.id);
    res.json(deletedCinemaHall);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;