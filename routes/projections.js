const express = require('express');
const router = express.Router();
const { Projection, Film, CinemaHall } = require("../models");

// returns all projections
router.get('/', async (req, res) => {
  const projections = await Projection.find().populate('film').populate('cinemahall');
  res.json(projections);
});
// Projection filtering by price less or equal to provided
router.get('/:price', async (req, res) => {
  const projections = await Projection.find().populate('film');
  console.log(projections)
  const projectionsFiltered = projections.filter((proj)=>{
    console.log(proj.price)
    console.log(req.params.price)
    console.log((proj.price <= req.params.price))
    return proj.price <= (+req.params.price)
  })
  console.log(req.params.price)
  console.log(projectionsFiltered)
  if(!projectionsFiltered || projectionsFiltered.length){
    return res.status(404).json({ error: 'Projections with price less or equal not found' });
  }
  res.json(projectionsFiltered);
});
// inserts projection into database
router.post('/', async (req, res) => {
  try {
    const { filmId, cinemaHallId, price, date, time } = req.body;

    const film = await Film.findById(filmId);
    const cinemaHall = await CinemaHall.findById(cinemaHallId);

    if (!film) {
      return res.status(404).json({ error: 'Film not found' });
    }

    if (!cinemaHall) {
      return res.status(404).json({ error: 'Cinema hall not found' });
    }

    if (film.threeD && !cinemaHall.threeD) {
      return res.status(400).json({ error: 'Cinema hall does not support 3D movies' });
    }

    const projection = new Projection({
      film: filmId,
      cinemahall: cinemaHallId,
      price,
      date,
      time,
      capacity: cinemaHall.capacity,
    });

    await projection.save();

    res.status(201).json(projection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
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