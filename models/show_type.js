'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var ShowTypeSchema = Schema({
	slug: String,
	name: String,
	checked: Boolean 
});

ShowTypeSchema.plugin(URLSlugs('name', {field: 'slug'}));
module.exports = mongoose.model('ShowType', ShowTypeSchema);