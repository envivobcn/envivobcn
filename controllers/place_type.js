'use strict'

var bcrypt = require ('bcrypt-nodejs');
var PlaceType = require('../models/place_type');
var jwt = require('../services/jwt.js');

function getPlaceType(req, res){

	var placeTypeSlug = req.params.slug;

	PlaceType.findOne({ 'slug': placeTypeSlug }, (err, placeType) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!placeType){
				res.status(404).send({message: 'El distrito no existe'});
			}else{
				res.status(200).send({placeType});
			}
		}
	});

}

function getPlaceTypes(req, res){

	PlaceType.find((err, placeTypes) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!placeTypes){
				res.status(404).send({message: 'No hay distritos'});
			}else{
				return res.status(200).send({
					placeTypes: placeTypes
				});
			}
		}
	}).sort('name');
}

function savePlaceType(req, res){

	var placeType = new PlaceType();
	var params = req.body;

	placeType.id = params.id;
	placeType.name = params.name;

	placeType.save((err, placeTypeStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar el local'});
		}else{
			if(!placeTypeStored){
				res.status(404).send({message: 'El distrito no ha sido guardado'});
			}else{
				res.status(200).send({placeType: placeTypeStored});
			}
		}
	});
}

function updatePlaceType(req, res){
	var placeTypeSlug = req.params.slug;
	var update = req.body;

	PlaceType.findOneAndUpdate({ 'slug': placeTypeSlug }, update, (err, placeTypeUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el distrito'});
		}else{
			if(!placeTypeUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el distrito'});
			}else{
				res.status(200).send({placeType: placeTypeUpdated});
			}
		}
	});
}

function deletePlaceType(req, res){
	var placeTypeSlug = req.params.slug;

	PlaceType.findOneAndRemove({ 'slug': placeTypeSlug }, (err, placeTypeRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error al eliminar el distrito'});
		}else{
			if(!placeTypeRemoved){
				res.status(404).send({message: 'El distrito no ha sido eliminado o no existe'});
			}else{
				res.status(200).send({placeTypeRemoved});
			}
		}
	});
}

module.exports = {
	getPlaceType,
	getPlaceTypes,
	savePlaceType,
	updatePlaceType,
	deletePlaceType
};