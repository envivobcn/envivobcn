'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3978;
var http = require('http');
var server = http.createServer(app);


mongoose.connect('mongodb://sergioapi:Eaurouge89@ds221003.mlab.com:21003/bcnenvivo', (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("BCNENVIVO DDBB connection running");

		server.listen(port, function(){
			console.log("Server API Rest BCNENVIVO listening");
		})
	}
});