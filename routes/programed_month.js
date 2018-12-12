'use strict'

var express = require('express');
var ProgramedMonthController = require('../controllers/programed_month');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/programed_month/:slug', ProgramedMonthController.getProgramedMonth);
api.get('/programed_months', ProgramedMonthController.getProgramedMonths);
api.post('/programed_month', md_auth.ensureAuth, ProgramedMonthController.saveProgramedMonth);
api.put('/programed_month/:slug', md_auth.ensureAuth, ProgramedMonthController.updateProgramedMonth);
api.delete('/programed_month/:slug', md_auth.ensureAuth, ProgramedMonthController.deleteProgramedMonth);

module.exports = api;