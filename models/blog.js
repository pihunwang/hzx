var mongoogse = require("mongoogse")
var BlogSchema = require("../schemas/blog")
var Blog = BlogSchema.model('Blog',BlogSchema)

module.exports = Blog