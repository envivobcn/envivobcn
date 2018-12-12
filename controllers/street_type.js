'use strict'

var bcrypt = require ('bcrypt-nodejs');
var StreetType = require('../models/street_type');
var jwt = require('../services/jwt.js');

function getStreetType(req, res){

	var streetTypeSlug = req.params.slug;

	StreetType.findOne({ 'slug': streetTypeSlug }, (err, streetType) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!streetType){
				res.status(404).send({message: 'El distrito no existe'});
			}else{
				res.status(200).send({streetType});
			}
		}
	});

}

function getStreetTypes(req, res){

	StreetType.find((err, streetTypes) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!streetTypes){
				res.status(404).send({message: 'No hay distritos'});
			}else{
				return res.status(200).send({
					streetTypes: streetTypes
				});
			}
		}
	}).sort('name');
}

function saveStreetType(req, res){

	var streetType = new StreetType();
	var params = req.body;

	streetType.id = params.id;
	streetType.name = params.name;

	streetType.save((err, streetTypeStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar el local'});
		}else{
			if(!streetTypeStored){
				res.status(404).send({message: 'El distrito no ha sido guardado'});
			}else{
				res.status(200).send({streetType: streetTypeStored});
			}
		}
	});
}

function updateStreetType(req, res){
	var streetTypeSlug = req.params.slug;
	var update = req.body;

	StreetType.findOneAndUpdate({ 'slug': streetTypeSlug }, update, (err, streetTypeUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el distrito'});
		}else{
			if(!streetTypeUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el distrito'});
			}else{
				res.status(200).send({streetType: streetTypeUpdated});
			}
		}
	});
}

function deleteStreetType(req, res){
	var streetTypeSlug = req.params.slug;

	StreetType.findOneAndRemove({ 'slug': streetTypeSlug }, (err, streetTypeRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error al eliminar el distrito'});
		}else{
			if(!streetTypeRemoved){
				res.status(404).send({message: 'El distrito no ha sido eliminado o no existe'});
			}else{
				res.status(200).send({streetTypeRemoved});
			}
		}
	});
}

module.exports = {
	getStreetType,
	getStreetTypes,
	saveStreetType,
	updateStreetType,
	deleteStreetType
};