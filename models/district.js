'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var DistrictSchema = Schema({
	index: String,
	name: String,
});

DistrictSchema.plugin(URLSlugs('name', {field: 'slug'}));
module.exports = mongoose.model('District', DistrictSchema);