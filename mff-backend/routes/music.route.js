const musicRouter = require('express').Router();
const musicController = require('../controllers/music.controller');
const {checkSchema, param} = require('express-validator');
const musicSchema = require('../schemas/music.schema');

musicRouter.get('/', musicController.getAllMusics);
musicRouter.get('/:id', musicController.getMusicById);
musicRouter.post('/', checkSchema(musicSchema), musicController.createMusic);
musicRouter.put('/:id', checkSchema(musicSchema), musicController.updateMusic);
musicRouter.delete('/:id', musicController.deleteMusic);

module.exports = musicRouter;