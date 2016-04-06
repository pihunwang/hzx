//module
var app = require("express")();
var mongoose = require("mongoose");
var fs = require("fs");
var formidable = require("formidable");

//model
var User = require('./models/user')
var Response = require('./models/Response')

var port = process.env.PORT || 1232 

mongoose.connect('mongodb://127.0.0.1/hzx');

app.listen(port);

console.log("hzx server started on port " + port);

//route
//http://127.0.0.1:1232/login?funId=111&password=1321
app.all('/login',function(req,res){
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
});

//http://127.0.0.1:1232/register?funId=111&password=1321&name=wkf&phone=13855987890
app.all('/register',function(req,res){
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
});

app.all('/getUserDetail',function(req,res){
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
})

app.post('/headImage',function(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir = "./public/temp";
	form.parse(req,function(error,fields,files){
		console.log(fields['funId']);
		for(var key in files){
			var file = files[key];
			var fName = fields['funId'];
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
			//console.log(file,file.size);
			var uploadDir = "./public/headImage/" + fName;
			fs.rename(file.path,uploadDir,function(err){
				if(err){
					var response = Response(1,"");
					res.json(response);
					res.end();
				}else{
					var response = Response(0,"")
					res.json(response);
					res.end();
				}
			})
		}
	})
})

app.post('/backImage',function(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir = "./public/temp";
	form.parse(req,function(error,fields,files){
		for(var key in files){
			var file = files[key];
			var fName = fields['funId'];
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
					var response = Response(0,"")
					res.json(response);
					res.end();
				}
			})
		}
	})
})
