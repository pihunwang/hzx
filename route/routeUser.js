var mongoose = require("mongoose");
var fs = require("fs");
var formidable = require("formidable");

//model
var User = require('../models/user')
var Response = require('../models/Response')

var port = process.env.PORT || 1234 

//route
function login(req,res){
	var funId = req.param('funId');
	var password = req.param('password');
	User.findByFunId(funId,function(err,user){
		if(err){
			var response = Response(1,"");
			res.json(response);
			res.end();
		}else{
			if(user.password === password){
				var response = Response(0,user);
				res.json(response);
				res.end();
			}else{
				var response = Response(1,"");
				res.json(response);
				res.end();
			}
		}	
	})
}

function register(req,res){
	var _user = new User({
		funId : req.param('funId'),
		password : req.param('password'),
		name : req.param('name'),
		phone : req.param('phone')
	})
	User.findByFunId(_user.funId,function(error,user){
		if(user == null){
			_user.save(function(error,user){
				if(error){
					var response = Response(1,"");
					res.json(response);
					res.end();
				}else{
					var response = Response(0,user);
					res.json(response);
					res.end();
				}
			})
		}else{
			var response = Response(1,"");
			res.json(response);
			res.end();
		}
	})
}

function getUserDetail(req,res){
	var funId = req.param('funId');
	User.findByFunId(funId,function(err,user){
		if(err){
			var response = Response(1,"");
			res.json(response);
			res.end();
		}else{
			if(user == null){
				var response = Response(1,"");
				res.json(response);
				res.end();
			}else{
				var response = Response(0,user);
				res.json(response);
				res.end();
			}
		}
	})
}

function headImage(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir = "./public/temp";
	form.parse(req,function(error,fields,files){
		for(var key in files){
			var file = files[key];
			var funId = fields['funId'];
			var fName = funId;
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
			var uploadDir = "./public/headImage/" + fName;
			fs.rename(file.path,uploadDir,function(err){
				if(err){
					var response = Response(1,"");
					res.json(response);
					res.end();
				}else{
					var dir = "http://127.0.0.1:" + port + "/headImage/" + fName;
					console.log(dir);
					User.findByFunId(funId,function(err,user){
						if(err){
							var response = Response(1,"");
							res.json(response);
							res.end();
						}else{
							if(user == null){
								var response = Response(1,"")
								res.json(response)
								res.end();
							}else{
								var _user = new User({
									funId : user.funId,
									password : user.password,
									name : user.name,
									phone : user.phone,
									headImage : dir,
									backImage : user.backImage
								})
								user.remove();		
								_user.save(function(err){
									if(err){
										var response = Response(1,"")
										res.json(response)
										res.end();
									}else{
										var response = Response(0,"");
										res.json(response)
										res.end();
									}
								})
							}
						}
					})
				}
			})
		}
	})	
}

function backImage(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir = "./public/temp";
	form.parse(req,function(error,fields,files){
		for(var key in files){
			var file = files[key];
			var funId = fields['funId'];
			var fName = funId;
			switch(file.type){
				case 'image/jpeg':
					fName = fName + ".jpg";
					break;
				case "image/.png":
					fName = fName + ".png";
					break;
				default:
					fName = fName + ".png";
					break;
			}
			var uploadDir = "./public/backImage/" + fName;
			fs.rename(file.path,uploadDir,function(err){
				if(err){
					var response = Response(1,"");
					res.json(response);
					res.end();
				}else{
					var dir = "http://127.0.0.1:" + port + "/backImage/" + fName;
					console.log(dir);
					User.findByFunId(funId,function(err,user){
						if(err){
							var response = Response(1,"");
							res.json(response);
							res.end();
						}else{
							if(user == null){
								var response = Response(1,"")
								res.json(response)
								res.end();
							}else{
								var _user = new User({
									funId : user.funId,
									password : user.password,
									name : user.name,
									phone : user.phone,
									headImage : user.headImage,
									backImage : dir
								})
								user.remove();		
								_user.save(function(err){
									if(err){
										var response = Response(1,"")
										res.json(response)
										res.end();
									}else{
										var response = Response(0,"");
										res.json(response)
										res.end();
									}
								})
							}
						}
					})
				}
			})
		}
	})	
}

exports.login = login
exports.register = register
exports.getUserDetail = getUserDetail
exports.headImage = headImage
exports.backImage = backImage
