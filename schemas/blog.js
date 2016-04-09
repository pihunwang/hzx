var mongoose = require("mongoose")

var BlogSchema = new mongoose.Schema({
	funId : String,
	content : String,
	image : String,
	createTime : String
})

BlogSchema.statics = {
	findByPage : function(lastId,count,cb){
		if(lastId == 0){
			var query = this.find({})
			query.limit(count)
			return query.exec(cb);
		}else{
			var query = this.find({'_id' : {"$gt" : lastId}})
			query.limit(count)
			return query.exec(cb);
		}
	},
	findByBlogId : function(blogId,cb){
		return this.findOne({_id:blogId}).exec(cb);
	},
	findByUser : function(fId,cb){
		return this.find({funId:fId}).exec(cb);
	}
}

module.exports = BlogSchema;