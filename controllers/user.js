'use strict'

var bcrypt = require ('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt.js');

function saveUser(req, res){

	var user = new User();
	var params = req.body;
	
	console.log(params);

	user.name = params.name;
	user.email = params.email;
	user.role = 'ROLE_ADMIN';

	if(params.password){
		bcrypt.hash(params.password, null, null, function(err, hash){
			user.password = hash;

			if(user.name != null && user.email != null){
				user.save((err, userStored) => {
					if(err){
						res.status(500).send({message: 'Error al guardar el usuario'});
					}else{
						if(!userStored){
							res.status(404).send({message: 'No se ha registrado el usuario'})
						}else{
							res.status(200).send({user: userStored});
						}
					}
				});

			}else{
				res.status(200).send({message: 'Introduce todos los campos'});
			}
		});
	}else{	
		res.status(200).send({message: 'Introduce la contraseña'});
	}
}

function loginUser(req, res){
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email: email.toLowerCase()}, (err, user) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!user){
				res.status(404).send({message: 'Usuario o contraseña incorrecto/s. Por favor, inténtalo de nuevo.'});
			}else{
				bcrypt.compare(password, user.password, function(err, check){
					if(check){
						if(params.gethash){
							res.status(200).send({
								token: jwt.createToken(user)
							});
						}else{
							res.status(200).send({user});
						}
					}else{
						res.status(404).send({message: 'Usuario o contraseña incorrecto/s. Por favor, inténtalo de nuevo.'});
					}
				});
			}
		}
	});
}

function updateUser(req, res){
	var userId = req.params.id;
	var update = req.body;
	var pass = update.password;

	if(pass.length != undefined){
		bcrypt.hash(update.password, null, null, function(err, hash){
			update.password = hash;
			console.log(update);
			User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
				if(err){
					res.status(500).send({message: 'Error al actualizar el usuario'});
				}else{
					if(!userUpdated){
						res.status(404).send({message: 'No se ha podido actualizar el usuario'});
					}else{
						res.status(200).send({user: userUpdated});
					}
				}
			});
		});
	}else{
		User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
			if(err){
				res.status(500).send({message: 'Error al actualizar el usuario'});
			}else{
				if(!userUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({user: userUpdated});
				}
			}
		});
	}
}

function deleteUser(req, res){
	var userId = req.params.id;

	User.findByIdAndRemove(userId, (err, userRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error al eliminar el usuario'});
		}else{
			if(!userRemoved){
				res.status(404).send({message: 'El usuario no ha sido eliminado o no existe'});
			}else{
				res.status(200).send({userRemoved});
			}
		}
	});
}

module.exports = {
	saveUser,
	loginUser,
	updateUser,
	deleteUser
};