##基于NodeJs的慧装修系统的后台API文档
###数据结构
####User
```
funId : String
password : String
name : String
phone : String
headImage : String
backImage : String
```
####Blog
```
funId : String
content : String
```
###所有返回值格式均为如下Json格式
```
{"code":0,"data":""}
```
####1.注册register
```
参数
	funId
	password
	name
	phone
返回
	0
```
####2.登录login
```
参数
	funId
	password
返回
	User
```
####3.获取个人信息getUserDetail
```
参数
	funId
返回
	User
```
####4.上传头像headImage
```
参数
	funId
	image
返回
	0
```
####5.上传背景图backImage
```
参数
	funId
	image
返回
	0
```

