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

musicRouter.use((err, req, res, next) => {
    if (err && err instanceof MulterError) {
        err.name = 'File validation error';
        if (err.code === 1) {
            err.error = 'attachedFile should be an audio or video';
        } else if (err.code === 2) {
            err.error = 'musicCoverPicture should be an image';
        }
        return res.status(422).json(err);
    }
    next();
})

module.exports = musicRouter;