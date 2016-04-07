var mongoose = require("mongoose");
var fs = require("fs");
var formidable = require("formidable");

//model
var User = require('../models/user')
var Blog = require("../models/blog")
var Response = require('../models/Response')

var port = process.env.PORT || 1234 

//route
function addBlogPic(req,res){
	var form = new formidable.http.IncomingForm();
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
			var uploadDir = "./public/blogImage/" + fName;
			fs.rename(file.path,uploadDir,function(Dir){
				if(err){
					res.json(Response(1,""));
					res.end();
				}else{
					var dir = "http://127.0.0.1:" + port + "/blogImage/" + fName;
					var response = Response(0,dir);
					res.json(response);
					res.end();
				}
			})
		}
	})
}


function addBlog(req,res){
	var _blog = new Blog({
		funId : req.param('funId'),
		content : req.param('content'),
		image : req.param('image'),
		zanCount : 0
	})
	Blog.save(function(error,blog){
		if(error){
			res.json(Response(1,""));
			res.end();
		}else{
			var response = Response(0,blog);
			res.json(response);
			res.end();
		}
	})
}

exports.addBlogPic = addBlogPic
exports.addBlog = addBlog