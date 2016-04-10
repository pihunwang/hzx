var mongoose = require("mongoose")
var GoddessSchema = require("../schemas/goddess")
var Goddess = mongoose.model('Goddess',GoddessSchema)

module.exports = Goddess