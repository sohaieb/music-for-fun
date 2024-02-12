const {musics} = require('../models/music.model');
const {notFoundHelper} = require('../helpers/not-found.helper');
const {v4: uuidv4} = require('uuid');
const {validationResult} = require('express-validator');

/**
 * Get all available music entities
 *
 * @param req
 * @param res
 */
function getAllMusics(req, res) {
    res.json(musics);
}

/**
 * Get music entity by its id
 *
 * @param req
 * @param res
 * @returns {*}
 */
function getMusicById(req, res) {
    const music = musics.find(music => music.id.toString() === req.params.id);
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
function createMusic(req, res) {
    const newMusic = {...req.body, id: uuidv4()};
    const validationResults = validationResult(req);
    if (validationResults.array().length) {
        return res.status(422).json({error: validationResults.mapped()});
    }
    musics.push(newMusic);
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
    const musicIndex = musics.findIndex(music => music.id.toString() === musicId);
    if (musicIndex >= 0) {
        const updatedMusic = req.body;
        musics[musicIndex] = {...musics[musicIndex], ...req.body};
        return res.status(200).json(musics[musicIndex]);
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
    const musicIndex = musics.findIndex(music => music.id.toString() === musicId);
    if (musicIndex >= 0) {
        const deletedMusic = musics.splice(musicIndex, 1)[0];
        return res.status(200).json(deletedMusic);
    }

    notFoundHelper(res, 'Music does not exist');
}


module.exports = {
    getAllMusics,
    getMusicById,
    createMusic,
    updateMusic,
    deleteMusic
}