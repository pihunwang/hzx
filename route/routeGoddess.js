var mongoose = require("mongoose")
var fs = require("fs")
var formidable = require("formidable")

//model
var Response = require("../models/Response")
var Goddess = require("../models/goddess")

var port = process.env.PORT || 1234
var url = '127.0.0.1'

//route
function addGoddessPic(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir = './public/temp'
	form.parse(req,function(error,fields,files){
		for(var key in files){
			var file = files[key]
			var funId = fields['funId']
			var date = new Date()
			var fName = funId + date.getTime()
			switch(file.type){
				case "image/jpeg":
					fName = fName + ".jpg";
					break;
				case "image/.png":
					fName = fName + ".png";
					break;
				default:
					fName = fName + ".png";
					break;
			}
			var uploadDir = "./public/goddess/" + fName;
			fs.rename(file.path,uploadDir,function(err){
				if(err){
					res.json(Response(1,""))
					res.end()
				}else{
					var dir = "http://" + url + ":" + port + "/goddess/" + fName;
					res.json(Response(0,dir))
					res.end()
				}
			})
		}
	})
}

function addGoddess(req,res){
	var _goddess = new Goddess({
		imageUrl : req.param('imageUrl'),
		name : req.param('name'),
		zanCount : 0
	})
	_goddess.save(function(error,goddess){
		if(error){
			res.json(Response(1,""))
			res.end()
		}else{
			res.json(Response(0,goddess))
			res.end()
		}
	})
}

function getGoddessList(req,res){	
	Goddess.findAll(function(err,cots){
		if(err){
			res.json(Response(1,""))
			res.end()
		}else{
			function f(a,b){
				return b.zanCount - a.zanCount
			}
			cots.sort(f)
			res.json(Response(0,cots))
			res.end()
		}
	})
}

function zanGoddess(req,res){
	var funId = req.param('funId')
	var goddessId = req.param('goddessId')
	Goddess.findByGoddessId(goddessId,function(err,goddess){
		if(err){
			res.json(Response(1,""))
			res.end()
		}else{
			if(goddess == null){
				res.json(Response(1,""))
				res.end()
			}else{
				var _goddess = new Goddess({
					_id : goddess._id,
					imageUrl : goddess.imageUrl,
					name : goddess.name,
					zanCount : parseInt(parseInt(goddess.zanCount) + 1)
				})
				console.log(goddess)
				console.log(_goddess)
				goddess.remove()
				_goddess.save(function(err){
					if(err){
						res.json(Response(1,""))
						res.end()
					}else{
						res.json(Response(0,""))
						res.end()
					}
				})
			}
		}
	})
}

exports.zanGoddess = zanGoddess
exports.getGoddessList = getGoddessList
exports.addGoddessPic = addGoddessPic
exports.addGoddess = addGoddess