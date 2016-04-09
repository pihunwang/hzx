var mongoose = require("mongoose")

var MessageSchema = new mongoose.Schema({
	fromId : String,
	toId : String,
	content : String,
	createTime : String
})

MessageSchema.statics = {
	findMyMessage : function(funId,cb){
		return this.find({toId:funId}).exec(cb)
	}
}

module.exports = MessageSchema
