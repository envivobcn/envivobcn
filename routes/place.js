'use strict'

var express = require('express');
var PlaceController = require('../controllers/place');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/place/:slug', PlaceController.getPlace);
api.get('/places', PlaceController.getPlaces);
api.get('/places-back', PlaceController.getPlacesBack);
api.get('/places-by-music/:id', PlaceController.getPlacesByMusic);
api.get('/places-by-district/:id', PlaceController.getPlacesByDistrict);
api.post('/place', md_auth.ensureAuth, PlaceController.savePlace);
api.put('/place/:slug', md_auth.ensureAuth, PlaceController.updatePlace);
api.delete('/place/:slug', md_auth.ensureAuth, PlaceController.deletePlace);

module.exports = api;