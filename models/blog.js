var mongoogse = require("mongoose")
var BlogSchema = require("../schemas/blog")
var Blog = mongoogse.model('Blog',BlogSchema)

module.exports = Blog