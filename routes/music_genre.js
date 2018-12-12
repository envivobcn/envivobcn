'use strict'

var express = require('express');
var MusicGenreController = require('../controllers/music_genre');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/music_genre/:slug', MusicGenreController.getMusicGenre);
api.get('/music_genres', MusicGenreController.getMusicGenres);
api.post('/music_genre', md_auth.ensureAuth, MusicGenreController.saveMusicGenre);
api.put('/music_genre/:slug', md_auth.ensureAuth, MusicGenreController.updateMusicGenre);
api.delete('/music_genre/:slug', md_auth.ensureAuth, MusicGenreController.deleteMusicGenre);

module.exports = api;