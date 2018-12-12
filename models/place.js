'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var PlaceSchema = Schema({
	name: String,
	description: String,
	district: Object,
	street_type: Object,
	address: String, 
	postal_code: String,
	city: String,
	latitude: Number,
	longitude: Number,
	url: String,
	url_program: String, 
	url_facebook: String,
	url_twitter: String,
	url_instagram: String,
	email: String,
	phone: String,
	agenda: Object,
	open_hours: {
		mon: String,
		tue: String,
		wed: String,
		thu: String,
		fri: String,
		sat: String,
		sun: String
	},
	music_genres: Object,
	show_types: Object,
	price: String,
	place_type: Object,
	gauging: String, 
	imgs: {
		src_xl: String,
		src_m: String,
		src_s: String,
		credit: {
			name: String,
			url: String
		}
	},
	price: String,
	published: Boolean 
});

PlaceSchema.plugin(URLSlugs('name', {field: 'slug'}));

module.exports = mongoose.model('Place', PlaceSchema);