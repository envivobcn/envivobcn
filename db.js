'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3978;
var http = require('http');
var server = http.createServer(app);

mongoose.connect('mongodb://localhost:27017/envivobcn', (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("BCNENVIVO Prod DDBB connection running");

		server.listen(port, function(){
			console.log("Server Prod API Rest BCNENVIVO listening");
		})
	}
});