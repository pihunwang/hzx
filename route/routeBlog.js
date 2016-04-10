var mongoose = require("mongoose");
var fs = require("fs");
var formidable = require("formidable");

//model
var User = require('../models/user')
var Blog = require("../models/blog")
var Response = require('../models/Response')

var port = process.env.PORT || 1234 
var url = '127.0.0.1'

//route
function addBlogPic(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir = "./public/temp";
	form.parse(req,function(error,fields,files){
		for(var key in files){
			var file = files[key];
			var funId = fields['funId'];
			var date = new Date();
			var fName = funId + date.getTime();
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
			fs.rename(file.path,uploadDir,function(err){
				if(err){
					res.json(Response(1,""));
					res.end();
				}else{
					var dir = "http://" + url + ":" + port + "/blogImage/" + fName;
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
		createTime : date.getTime()
	})
	_blog.save(function(error,blog){
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

function getBlogList(req,res){
	var lastId = req.param('lastId')
	var count = req.param('count')
	Blog.findByPage(lastId,count,function(err,cots){
		if(err){
			res.json(Response(1,""))
			res.end()
		}else{
			res.json(Response(0,cots))
			res.end()
		}
	})
}

function getUserBlogList(req,res){
	var funId = req.param('funId')
	Blog.findByUser(funId,function(err,cots){
		if(err){
			res.json(Response(1,""))
			res.end()
		}else{
			res.json(Response(0,cots))
			res.end()
		}
	})
}


exports.addBlogPic = addBlogPic
exports.addBlog = addBlog
exports.getBlogList = getBlogList
exports.getUserBlogList = getUserBlogList