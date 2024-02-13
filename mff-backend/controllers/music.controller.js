const {musicRepository} = require('../models/music.model');
const {notFoundHelper} = require('../helpers/not-found.helper');
const {v4: uuidv4} = require('uuid');
const {validationResult} = require('express-validator');
const {MulterError} = require("multer");
const path = require('path');

/**
 * Get all available music entities
 *
 * @param req
 * @param res
 */
function getAllMusics(req, res) {
    res.json(musicRepository.musics);
}

/**
 * Get music entity by its id
 *
 * @param req
 * @param res
 * @returns {*}
 */
function getMusicById(req, res) {
    const music = musicRepository.musics.find(music => music.id.toString() === req.params.id);
    if (music) {
        return res.json(music);
    }

    notFoundHelper(res, 'Music does not exist');
}

/**
 * Create new music entity
 *
 * @param req
 * @param res
 */
async function createMusic(req, res) {
    const newMusic = {...req.body, id: uuidv4()};
    const validationResults = validationResult(req);
    if (validationResults.array().length) {
        return res.status(422).json({error: validationResults.mapped()});
    }
    newMusic.attachedFile = req.files.attachedFile?.[0]?.path;
    newMusic.musicCoverPicture = req.files.musicCoverPicture?.[0]?.path;
    if (newMusic.attachedFile) {
        newMusic.attachedFile = path.relative(process.cwd(), newMusic.attachedFile);
    } else {
        delete newMusic.attachedFile;
    }
    if (newMusic.musicCoverPicture) {
        newMusic.musicCoverPicture = path.relative(process.cwd(), newMusic.musicCoverPicture);
    } else {
        delete newMusic.musicCoverPicture;
    }
    musicRepository.musics.push(newMusic);
    await musicRepository.update();
    res.status(201).json(newMusic);
}

/**
 * Update music by the given parameters & id
 *
 * @param req
 * @param res
 */
function updateMusic(req, res) {
    const musicId = req.params.id.toString();
    const musicIndex = musicRepository.musics.findIndex(music => music.id.toString() === musicId);
    if (musicIndex >= 0) {
        const updatedMusic = req.body;
        musicRepository.musics[musicIndex] = {...musicRepository.musics[musicIndex], ...req.body};
        return res.status(200).json(musicRepository.musics[musicIndex]);
    }

    notFoundHelper(res, 'Music does not exist');
}

/**
 * Delete music by id
 *
 * @param req
 * @param res
 * @returns {*}
 */
function deleteMusic(req, res) {
    const musicId = req.params.id.toString();
    const musicIndex = musicRepository.musics.findIndex(music => music.id.toString() === musicId);
    if (musicIndex >= 0) {
        const deletedMusic = musicRepository.musics.splice(musicIndex, 1)[0];
        return res.status(200).json(deletedMusic);
    }

    notFoundHelper(res, 'Music does not exist');
}

/**
 * Handle different music APIs errors like upload files
 *
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function handleMusicErrors(err, req, res, next) {
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
}


module.exports = {
    getAllMusics,
    getMusicById,
    createMusic,
    updateMusic,
    deleteMusic,
    handleMusicErrors
}