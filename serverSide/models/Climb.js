var mongoose = require('mongoose')
var Schema   = mongoose.Schema


var climbSchema = new Schema({
	section: String,
	grade: String,
	color: String,
	rating: String
})

var Climb = mongoose.model('Climb', climbSchema)

module.exports = Climb
