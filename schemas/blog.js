var mongoose = require("mongoose")

var BlogSchema = new mongoose.Schema({
	funId : String,
	content : String,
	image : String,
	zanCount : String
})

BlogSchema.statics = {
	findByPage : function(lastId,cb){
		if(lastId == 0){
			var query = this.find({})
			query.limit(10)
			return query.exec(cb);
		}else{
			var query = this.find({'_id' > last_id})
			query.limit(10)
			return query.exec(cb);
		}
	}
}

module.exports = BlogSchema;