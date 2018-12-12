'use strict'

var express = require('express');
var PlaceTypeController = require('../controllers/place_type');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/place_type/:slug', PlaceTypeController.getPlaceType);
api.get('/place_types', PlaceTypeController.getPlaceTypes);
api.post('/place_type', md_auth.ensureAuth, PlaceTypeController.savePlaceType);
api.put('/place_type/:slug', md_auth.ensureAuth, PlaceTypeController.updatePlaceType);
api.delete('/place_type/:slug', md_auth.ensureAuth, PlaceTypeController.deletePlaceType);

module.exports = api;