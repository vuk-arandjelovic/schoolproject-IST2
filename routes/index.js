const express = require('express');
const filmsRoutes = require('./films');
const cinemahallsRoutes = require('./cinemahalls');
const projectionsRoutes = require('./projections');
const reservationsRoutes = require('./reservations');

const router = express.Router();
router.use('/films', filmsRoutes);
router.use('/cinemahalls', cinemahallsRoutes);
router.use('/projections', projectionsRoutes);
router.use('/reservations', reservationsRoutes);

module.exports = router
