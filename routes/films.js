const express = require('express');
const router = express.Router();
const { Film } = require("../models");

// returns all films
router.get('/', async (req, res) => {
  const films = await Film.find();
  res.json(films);
});

// returns one films by id
router.get('/:id', async (req, res) => {
  const film = await Film.findById(req.params.id);
  res.json(film);
});

// inserts film into database
router.post('/', async (req, res) => {
  const film = new Film(req.body);
  try {
    const savedFilm = await film.save();
    res.status(201).json(savedFilm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// updates film from database by id
router.put('/:id', async (req, res) => {
  try {
    const updatedFilm = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFilm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// deletes film from database by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedFilm = await Film.findByIdAndDelete(req.params.id);
    res.json(deletedFilm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;