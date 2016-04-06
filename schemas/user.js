var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	funId : String,
	password : String,
	name : String,
	phone : String,
	headImage : String,
	backImage : String
})

UserSchema.statics = {
	findByFunId: function(funId,cb){
		return this.findOne({funId:funId}).exec(cb);
	}
}

module.exports = UserSchema