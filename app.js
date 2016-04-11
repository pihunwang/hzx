//module
var express = require("express");
var mongoose = require("mongoose");
var fs = require("fs");
var formidable = require("formidable");
var app = express();

//route.js
var routeUser = require("./route/routeUser.js")
var routeBlog = require("./route/routeBlog.js")
var routeMessage = require("./route/routeMessage.js")
var routeGoddess = require("./route/routeGoddess.js")

//端口
var port = process.env.PORT || 1234 
var url = '127.0.0.1'

//连接mongo数据库
mongoose.connect('mongodb://' + url + '/hzx');

app.listen(port);

console.log("hzx server started on port " + port);

app.use(express.static('public'));

app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

//routeUser
app.all('/login',function(req,res){
	routeUser.login(req,res)
})

app.all('/register',function(req,res){
	routeUser.register(req,res)
})

app.all('/getUserDetail',function(req,res){
	routeUser.getUserDetailC(req,res)
})

app.post('/headImage',function(req,res){
	routeUser.headImage(req,res)
})

app.post('/backImage',function(req,res){
	routeUser.backImage(req,res)
})

//routeBlog
app.post('/addBlogPic',function(req,res){
	routeBlog.addBlogPic(req,res)
})

app.all('/addBlog',function(req,res){
	routeBlog.addBlog(req,res)
})

app.all('/getBlogList',function(req,res){
	routeBlog.getBlogList(req,res)
})

app.all('/getUserBlogList',function(req,res){
	routeBlog.getUserBlogList(req,res)
})

//routeMessage
app.all('/sendMessage',function(req,res){
	routeMessage.sendMessage(req,res)
})

app.all('/receiveMessage',function(req,res){
	routeMessage.receiveMessage(req,res)
})

//routeGoddess
app.all('/getGoddessList',function(req,res){
	routeGoddess.getGoddessList(req,res)
})

app.all('/addGoddessPic',function(req,res){
	routeGoddess.addGoddessPic(req,res)
})

app.all('/addGoddess',function(req,res){
	routeGoddess.addGoddess(req,res)
})

app.all('/zanGoddess',function(req,res){
	routeGoddess.zanGoddess(req,res)
})