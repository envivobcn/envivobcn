'use strict'

var bcrypt = require ('bcrypt-nodejs');
var District = require('../models/district');
var jwt = require('../services/jwt.js');

function getDistrict(req, res){

	var districtSlug = req.params.slug;

	District.findOne({ 'slug': districtSlug }, (err, district) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!district){
				res.status(404).send({message: 'El distrito no existe'});
			}else{
				res.status(200).send({district});
			}
		}
	});

}

function getDistricts(req, res){

	District.find((err, districts) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!districts){
				res.status(404).send({message: 'No hay distritos'});
			}else{
				return res.status(200).send({
					districts: districts
				});
			}
		}
	}).sort('name');
}

function saveDistrict(req, res){

	var district = new District();
	var params = req.body;

	district.id = params.id;
	district.name = params.name;
	district.index = params.index;

	district.save((err, districtStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar el local'});
		}else{
			if(!districtStored){
				res.status(404).send({message: 'El distrito no ha sido guardado'});
			}else{
				res.status(200).send({district: districtStored});
			}
		}
	});
}

function updateDistrict(req, res){
	var districtSlug = req.params.slug;
	var update = req.body;

	District.findOneAndUpdate({ 'slug': districtSlug }, update, (err, districtUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el distrito'});
		}else{
			if(!districtUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el distrito'});
			}else{
				res.status(200).send({district: districtUpdated});
			}
		}
	});
}

function deleteDistrict(req, res){
	var districtSlug = req.params.slug;

	District.findOneAndRemove({ 'slug': districtSlug }, (err, districtRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error al eliminar el distrito'});
		}else{
			if(!districtRemoved){
				res.status(404).send({message: 'El distrito no ha sido eliminado o no existe'});
			}else{
				res.status(200).send({districtRemoved});
			}
		}
	});
}

module.exports = {
	getDistrict,
	getDistricts,
	saveDistrict,
	updateDistrict,
	deleteDistrict
};