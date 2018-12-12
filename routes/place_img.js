'use strict'

var express = require('express');
var api = express.Router();
var multer = require('multer');
var dir = './media';
var path = require('path');
var PlaceController = require('../controllers/place');
var md_auth = require('../middlewares/authenticated');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
});

var upload = multer({storage: storage}).single('file');

api.post('/upload/', md_auth.ensureAuth, function(req,res,next){
	upload(req,res,function(err){
		if(err){
			return res.status(500).json({error:err});
		}
		return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
	});
});

api.get('/media/:imageFile', PlaceController.getImageFile);

module.exports = api;