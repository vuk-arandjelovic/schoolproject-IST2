const express = require('express');
const router = express.Router();
const { Projection } = require("../models");

// returns all projections
router.get('/', async (req, res) => {
  const projections = await Projection.find().populate('film');
  res.json(projections);
});
// inserts projection into database
router.post('/', async (req, res) => {
  const projection = new Projection(req.body);
  try {
    const savedProjection = await projection.save();
    res.status(201).json(savedProjection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// updates projection from database by id
router.put('/:id', async (req, res) => {
  try {
    const updatedProjection = await Projection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProjection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// deletes projection from database by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedProjection = await Projection.findByIdAndDelete(req.params.id);
    res.json(deletedProjection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;