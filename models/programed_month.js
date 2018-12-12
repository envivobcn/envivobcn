'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var ProgramedMonthSchema = Schema({
	slug: String,
	index: Number,
	name: String,
	checked: Boolean
});

ProgramedMonthSchema.plugin(URLSlugs('name', {field: 'slug'}));
module.exports = mongoose.model('ProgramedMonth', ProgramedMonthSchema);