const musicRouter = require('express').Router();
const musicController = require('../controllers/music.controller');


musicRouter.get('/', musicController.getAllMusics);
musicRouter.get('/:id', musicController.getMusicById);
musicRouter.post('/', musicController.createMusic);
musicRouter.put('/:id', musicController.updateMusic);
musicRouter.delete('/:id', musicController.deleteMusic);

module.exports = musicRouter;