var mongoose = require('mongoose')
var Schema   = mongoose.Schema


var climbSchema = new Schema({
	section: String,
	grade: String,
	color: String,
	rating: Number,
	_gym: {type: Number, ref: "Gym" }
})