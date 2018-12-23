'use strict'

const fs = require('fs');
const express = require('express');
const bcrypt = require ('bcrypt-nodejs');
const Place = require('../models/place');
const jwt = require('../services/jwt.js');
const api = express.Router();
const path = require('path');

// Get place
function getPlace(req, res){

	var placeSlug = req.params.slug;

	Place.findOne({ 'slug': placeSlug }, (err, place) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!place){
				res.status(404).send({message: 'El local no existe'});
			}else{
				res.status(200).send({place});
			}
		}
	});

}

// Get places
function getPlaces(req, res){
	Place.find({'published':true}, (err, places) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!places){
				res.status(404).send({message: 'No hay locales'});
			}else{
				return res.status(200).send({
					places: places
				});
			}
		}
	}).sort('name');
}

// Get places
function getPlacesBack(req, res){
	Place.find((err, places) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!places){
				res.status(404).send({message: 'No hay locales'});
			}else{
				return res.status(200).send({
					places: places
				});
			}
		}
	}).sort('name');
}

// Get places by music
function getPlacesByMusic(req, res){

	var musicGenreSlug = req.params.id;

	Place.find({ 'published' : true , 'music_genres.slug': musicGenreSlug }, (err, places) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!places){
				res.status(404).send({message: 'No hay locales'});
			}else{
				return res.status(200).send({
					places: places
				});
			}
		}
	}).sort('name');
}

// Get places by district
function getPlacesByDistrict(req, res){

	var districtSlug = req.params.id;

	Place.find({ 'published' : true, 'district.slug': districtSlug }, (err, places) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!places){
				res.status(404).send({message: 'No hay locales'});
			}else{
				return res.status(200).send({
					places: places
				});
			}
		}
	}).sort('name');
}

// Save place
function savePlace(req, res){

	var place = new Place();
	var params = req.body;
	console.log(params);

	place.name = params.name;
	place.description = params.description;
	place.district = params.district;
	place.street_type = params.street_type;
	place.address = params.address;
	place.postal_code = params.postal_code;
	place.city = params.city;
	place.latitude = params.latitude;
	place.longitude = params.longitude;
	place.url = params.url;
	place.url_program = params.url_program;
	place.url_facebook = params.uurl_facebook;
	place.url_twitter = params.url_twitter;
	place.url_instagram = params.uurl_instagram;
	place.email = params.email;
	place.phone = params.phone;
	place.agenda = params.agenda;
	place.open_hours = params.open_hours;
	place.music_genres = params.music_genres;
	place.show_types = params.show_types;
	place.price = params.price;
	place.place_type = params.place_type;
	place.gauging = params.gauging;
	place.imgs = params.imgs;
	place.published = params.published;

	place.save((err, placeStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar el local'});
		}else{
			if(!placeStored){
				res.status(404).send({message: 'El local no ha sido guardado'});
			}else{
				res.status(200).send({place: placeStored});
			}
		}
	});
}

// Update place
function updatePlace(req, res){
	var placeSlug = req.params.slug;
	var update = req.body;

	Place.findOneAndUpdate({ 'slug': placeSlug }, update, (err, placeUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el local'});
		}else{
			if(!placeUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el local'});
			}else{
				res.status(200).send({place: placeUpdated});
			}
		}
	});
}

// Delete place
function deletePlace(req, res){
	var placeSlug = req.params.slug;

	Place.findOneAndRemove({ 'slug': placeSlug }, (err, placeRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error al eliminar el local'});
		}else{
			if(!placeRemoved){
				res.status(404).send({message: 'El local no ha sido eliminado o no existe'});
			}else{
				res.status(200).send({placeRemoved});
			}
		}
	});
}


// GetImageFile 
function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './media/'+imageFile;

	fs.exists(path_file , function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen'});
		}
	});
}

// Exports
module.exports = {
	getPlace,
	getPlaces,
	getPlacesBack,
	getPlacesByMusic,
	getPlacesByDistrict,
	savePlace,
	updatePlace,
	deletePlace,
	getImageFile
};