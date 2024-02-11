const allRoutes = require('express').Router();
const musicRoutes = require('./music.route');


allRoutes.use('/musics', musicRoutes);


module.exports = allRoutes;