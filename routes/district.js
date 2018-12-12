'use strict'

var express = require('express');
var DistrictController = require('../controllers/district');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/district/:slug', DistrictController.getDistrict);
api.get('/districts', DistrictController.getDistricts);
api.post('/district', md_auth.ensureAuth, DistrictController.saveDistrict);
api.put('/district/:slug', md_auth.ensureAuth, DistrictController.updateDistrict);
api.delete('/district/:slug', md_auth.ensureAuth, DistrictController.deleteDistrict);

module.exports = api;