'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'i_cant_do_55';

exports.ensureAuth = function(req, res, next){
	if(!req.headers.authorization){
		return res.status(403).send({message: 'Authentication headers are missing'});
	}

	var token = req.headers.authorization.replace(/['"]+/g, '');

	try{
		var payload = jwt.decode(token, secret);

		if(payload.exp <= moment().unix()){
			return res.status(401).send({message: 'Expired token'});
		}
	}catch(ex){
		return res.status(404).send({message: 'Invalid token'});
	}

	req.user = payload;

	next();
};