const musicRouter = require('express').Router();
const musicController = require('../controllers/music.controller');
const {checkSchema, check} = require('express-validator');
const uploader = require('../middlewares/uploader.middleware');
const musicSchema = require('../schemas/music.schema');
const {MulterError} = require("multer");


musicRouter.get('/', musicController.getAllMusics);
musicRouter.get('/:id', musicController.getMusicById);
musicRouter.post('/', uploader.fields([{name: 'attachedFile'}, {name: 'musicCoverPicture'}]), musicController.createMusic);
musicRouter.put('/:id', checkSchema(musicSchema), musicController.updateMusic);
musicRouter.delete('/:id', musicController.deleteMusic);


musicRouter.use(musicController.handleMusicErrors);

module.exports = musicRouter;