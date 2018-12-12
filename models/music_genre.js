'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var MusicGenreSchema = Schema({
	index: Number,
	slug: String,
	name: String,
	checked: Boolean 
});

MusicGenreSchema.plugin(URLSlugs('name', {field: 'slug'}));
module.exports = mongoose.model('MusicGenre', MusicGenreSchema);