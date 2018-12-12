'use strict'

var bcrypt = require ('bcrypt-nodejs');
var MusicGenre = require('../models/music_genre');
const Place = require('../models/place');
var jwt = require('../services/jwt.js');

function getMusicGenre(req, res){

	var musicGenreSlug = req.params.slug;

	MusicGenre.findOne({ 'slug': musicGenreSlug }, (err, musicGenre) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!musicGenre){
				res.status(404).send({message: 'El género musical no existe'});
			}else{
				res.status(200).send({musicGenre});
			}
		}
	});

}

function getMusicGenres(req, res){

	MusicGenre.find((err, musicGenres) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!musicGenres){
				res.status(404).send({message: 'No hay géneros musicales'});
			}else{
				return res.status(200).send({
					musicGenres: musicGenres
				});
			}
		}
	}).sort('name');
}

function saveMusicGenre(req, res){

	var musicGenre = new MusicGenre();
	var params = req.body;

	musicGenre.id = params.id;
	musicGenre.name = params.name;
	musicGenre.index = params.index;
	musicGenre.checked = params.checked;

	musicGenre.save((err, musicGenreStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar el local'});
		}else{
			if(!musicGenreStored){
				res.status(404).send({message: 'El género musical no ha sido guardado'});
			}else{
				res.status(200).send({musicGenre: musicGenreStored});
			}
		}
	});
}

function updateMusicGenre(req, res){
	var musicGenreSlug = req.params.slug;
	var update = req.body;

	MusicGenre.findOneAndUpdate({ 'slug': musicGenreSlug }, update, (err, musicGenreUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el local'});
		}else{
			if(!musicGenreUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el género musical'});
			}else{
				res.status(200).send({musicGenre: musicGenreUpdated});
			}
		}
	});
}

function deleteMusicGenre(req, res){
	var musicGenreSlug = req.params.slug;

	MusicGenre.findOneAndRemove({ 'slug': musicGenreSlug }, (err, musicGenreRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error al eliminar el local'});
		}else{
			if(!musicGenreRemoved){
				res.status(404).send({message: 'El género musical no ha sido eliminado o no existe'});
			}else{
				res.status(200).send({musicGenreRemoved});
			}
		}
	});
}

module.exports = {
	getMusicGenre,
	getMusicGenres,
	saveMusicGenre,
	updateMusicGenre,
	deleteMusicGenre
};