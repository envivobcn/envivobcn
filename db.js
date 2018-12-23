'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3978;
var http = require('http');
var https = require('https');
var fs = require("fs");
var https = require('https');
var server = https.createServer(options, app);
var options = {
	key: fs.readFileSync('/etc/letsencrypt/live/envivo.barcelona/privkey.pem'), 
	cert: fs.readFileSync('/etc/letsencrypt/live/envivo.barcelona/fullchain.pem')
};

mongoose.connect('mongodb://localhost:27017/envivobcn', (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("BCNENVIVO DDBB connection running");

		server.listen(port, function(){
			console.log("Server API Rest BCNENVIVO listening");
		})
	}
});