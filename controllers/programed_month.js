'use strict'

var bcrypt = require ('bcrypt-nodejs');
var ProgramedMonth = require('../models/programed_month');
var jwt = require('../services/jwt.js');

function getProgramedMonth(req, res){

	var programedMonthSlug = req.params.slug;

	ProgramedMonth.findOne({ 'slug': programedMonthSlug }, (err, programedMonth) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!programedMonth){
				res.status(404).send({message: 'El mes no existe'});
			}else{
				res.status(200).send({programedMonth});
			}
		}
	});

}

function getProgramedMonths(req, res){

	ProgramedMonth.find((err, programedMonths) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!programedMonths){
				res.status(404).send({message: 'No hay meses'});
			}else{
				return res.status(200).send({
					programedMonths: programedMonths
				});
			}
		}
	}).sort('index');
}

function saveProgramedMonth(req, res){

	var programedMonth = new ProgramedMonth();
	var params = req.body;

	programedMonth.id = params.id;
	programedMonth.index = params.index;
	programedMonth.name = params.name;
	programedMonth.checked = params.checked;

	programedMonth.save((err, programedMonthStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar el mes'});
		}else{
			if(!programedMonthStored){
				res.status(404).send({message: 'El mes no ha sido guardado'});
			}else{
				res.status(200).send({programedMonth: programedMonthStored});
			}
		}
	});
}

function updateProgramedMonth(req, res){
	var programedMonthSlug = req.params.slug;
	var update = req.body;

	ProgramedMonth.findOneAndUpdate({ 'slug': programedMonthSlug }, update, (err, programedMonthUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el mes'});
		}else{
			if(!programedMonthUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el mes'});
			}else{
				res.status(200).send({programedMonth: programedMonthUpdated});
			}
		}
	});
}

function deleteProgramedMonth(req, res){
	var programedMonthSlug = req.params.slug;

	ProgramedMonth.findOneAndRemove({ 'slug': programedMonthSlug }, (err, programedMonthRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error al eliminar el mes'});
		}else{
			if(!programedMonthRemoved){
				res.status(404).send({message: 'El mes no ha sido eliminado o no existe'});
			}else{
				res.status(200).send({programedMonthRemoved});
			}
		}
	});
}

module.exports = {
	getProgramedMonth,
	getProgramedMonths,
	saveProgramedMonth,
	updateProgramedMonth,
	deleteProgramedMonth
};