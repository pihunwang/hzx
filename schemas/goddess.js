var mongoose = require("mongoose")

var GoddessSchema = new mongoose.Schema({
	imageUrl : String,
	name : String,
	zanCount : String
})

GoddessSchema.statics = {
	findAll : function(cb){
		return this.find({}).exec(cb)
	},
	findByGoddessId : function(goddessId,cb){
		return this.findOne({_id:goddessId}).exec(cb)
	}
}

module.exports = GoddessSchema