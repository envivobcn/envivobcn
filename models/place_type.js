'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var PlaceTypeSchema = Schema({
	name: String,
});

PlaceTypeSchema.plugin(URLSlugs('name', {field: 'slug'}));
module.exports = mongoose.model('PlaceType', PlaceTypeSchema);