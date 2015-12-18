var mongoose = require('mongoose')
var Schema   = mongoose.Schema


var climbSchema = new Schema({
	section: {type: String, required: true},
	grade: {type: String, required: true},
	color: {type: String, required: true},
	rating: {type: String, required: true}
})

var Climb = mongoose.model('Climb', climbSchema)

module.exports = Climb
