'use strict'

var bcrypt = require ('bcrypt-nodejs');
var ShowType = require('../models/show_type');
var jwt = require('../services/jwt.js');

function getShowType(req, res){

	var showTypeSlug = req.params.slug;

	ShowType.findOne({ 'slug': showTypeSlug }, (err, showType) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!showType){
				res.status(404).send({message: 'El espectáculo no existe'});
			}else{
				res.status(200).send({showType});
			}
		}
	});

}

function getShowTypes(req, res){

	ShowType.find((err, showTypes) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!showTypes){
				res.status(404).send({message: 'No hay espectáculos'});
			}else{
				return res.status(200).send({
					showTypes: showTypes
				});
			}
		}
	}).sort('name');
}

function saveShowType(req, res){

	var showType = new ShowType();
	var params = req.body;

	showType.id = params.id;
	showType.name = params.name;
	showType.checked = params.checked;

	showType.save((err, showTypeStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar el espectáculo'});
		}else{
			if(!showTypeStored){
				res.status(404).send({message: 'El espectáculo no ha sido guardado'});
			}else{
				res.status(200).send({showType: showTypeStored});
			}
		}
	});
}

function updateShowType(req, res){
	var showTypeSlug = req.params.slug;
	var update = req.body;

	ShowType.findOneAndUpdate({ 'slug': showTypeSlug }, update, (err, showTypeUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el espectáculo'});
		}else{
			if(!showTypeUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el espectáculo'});
			}else{
				res.status(200).send({showType: showTypeUpdated});
			}
		}
	});
}

function deleteShowType(req, res){
	var showTypeSlug = req.params.slug;

	ShowType.findOneAndRemove({ 'slug': showTypeSlug }, (err, showTypeRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error al eliminar el espectáculo'});
		}else{
			if(!showTypeRemoved){
				res.status(404).send({message: 'El espectáculo no ha sido eliminado o no existe'});
			}else{
				res.status(200).send({showTypeRemoved});
			}
		}
	});
}

module.exports = {
	getShowType,
	getShowTypes,
	saveShowType,
	updateShowType,
	deleteShowType
};