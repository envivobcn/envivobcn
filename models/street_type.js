'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var StreetTypeSchema = Schema({
	name: String,
});

StreetTypeSchema.plugin(URLSlugs('name', {field: 'slug'}));
module.exports = mongoose.model('StreetType', StreetTypeSchema);