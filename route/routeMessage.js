var mongoose = require("mongoose")
var fs = require("fs")
var formidable = require("formidable")

//model
var User = require("../models/user")
var Blog = require("../models/blog")
var Response = require("../models/Response")
var Message = require("../models/message")

var port = process.env.PORT || 1234

//route
function sendMessage(req,res){
	var date = new Date()
	var _message = new Message({
		fromId : req.param('fromId'),
		toId : req.param('toId'),
		content : req.param('content'),
		createTime : date.getTime()
	})
	_message.save(function(err,message){
		if(err){
			res.json(Response(1,""))
			res.end()
		}else{		
			res.json(Response(0,message))
			res.end()
		}
	})
}

function receiveMessage(req,res){
	var funId = req.param('funId')
	Message.findMyMessage(funId,function(err,cots){
		if(err){
			res.json(Response(1,""))
			res.end()
		}else{
			function f(a,b){
				return b.createTime - a.createTime
			}
			cots.sort(f);
			res.json(Response(0,cots))
			res.end()
		}
	})
}

exports.sendMessage = sendMessage
exports.receiveMessage = receiveMessage