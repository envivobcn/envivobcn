'use strict'

var express = require('express');
var ShowTypeController = require('../controllers/show_type');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/show_type/:slug', ShowTypeController.getShowType);
api.get('/show_types', ShowTypeController.getShowTypes);
api.post('/show_type', md_auth.ensureAuth, ShowTypeController.saveShowType);
api.put('/show_type/:slug', md_auth.ensureAuth, ShowTypeController.updateShowType);
api.delete('/show_type/:slug', md_auth.ensureAuth, ShowTypeController.deleteShowType);

module.exports = api;