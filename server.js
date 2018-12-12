var app = require('/.app') // this is your express app
var http = require('http') // HTTP server

/**
	* Get port from environment and store in Express.
	*/
var port = process.env.PORT // 2. Using process.env.PORT
app.set('port', port);

/**
	* Create HTTP server.
	*/
var server = http.createServer(app);

var mongoose = require('mongoose');

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