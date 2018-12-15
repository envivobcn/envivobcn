'use strict'

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

// Routes

var user_routes = require('./routes/user');
var place_routes = require('./routes/place');
var music_genre_routes = require('./routes/music_genre');
var district_routes = require('./routes/district');
var programed_month_routes = require('./routes/programed_month');
var street_type_routes = require('./routes/street_type');
var show_type_routes = require('./routes/show_type');
var place_type_routes = require('./routes/place_type');
var place_img_routes = require('./routes/place_img');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Headers
app.use(cors());

// Base routes
app.use('/', express.static('client', {redirect: false}));
app.use('/api', user_routes);
app.use('/api', place_routes);
app.use('/api', music_genre_routes);
app.use('/api', district_routes);
app.use('/api', programed_month_routes);
app.use('/api', street_type_routes);
app.use('/api', show_type_routes);
app.use('/api', place_type_routes);
app.use('/api', place_img_routes);

app.get('*', function(req, res, next){
	res.sendFile(path.resolve('client/index.html'));
});

module.exports = app;