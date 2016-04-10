##基于NodeJs的校园微博后台API文档
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
image : String
createTime : String
```
####Message
```
fromId : String
toId : String
content : String
createTime : String
```
####Goddess
```
imageUrl : String
name : String
zanCount : String
```
###接口统一前缀（如http://ytying.duapp.com/login）
```
ytying.duapp.com
```
###所有返回值格式均为如下Json格式
```
{"code":0,"data":""}
```
###User模块
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
###Blog模块
####1.上传微博图片
```
参数
	funId
	image
返回
	imageUrl : String
```
####2.上传微博
```
参数
	funId
	content
	image
返回
	0
```
####3.拉取所有微博（分页）
```
参数
	lastId（0代表从头开始，其他的给最后一个BlogId）
	count（一次拉取多少条）
返回
	BlogList
```
####4.拉取一个用户所有微博
```
参数
	funId
返回
	BlogList
```
###Message模块
####1.发送小纸条
```
参数
	fromId
	toId
	content
返回
	Message
```
####2.拉取小纸条
```
参数
	funId
返回
	MessageList（按时间从近到远排序）
```
###Goddess模块
####1.上传女神照片
```
参数
	funId
	image
返回
	imageUrl : String
```
####2.上传女神资料
```
参数
	imageUrl
	name
返回
	Goddess
```
####3.获取所有女神照片
```
参数
	无
返回
	GoddessList
```
####4.给女神点赞
```
参数
	goddessId
	funId
返回
	0
```