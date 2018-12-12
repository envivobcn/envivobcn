'use strict'

var express = require('express');
var StreetTypeController = require('../controllers/street_type');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/street_type/:slug', StreetTypeController.getStreetType);
api.get('/street_types', StreetTypeController.getStreetTypes);
api.post('/street_type', md_auth.ensureAuth, StreetTypeController.saveStreetType);
api.put('/street_type/:slug', md_auth.ensureAuth, StreetTypeController.updateStreetType);
api.delete('/street_type/:slug', md_auth.ensureAuth, StreetTypeController.deleteStreetType);

module.exports = api;