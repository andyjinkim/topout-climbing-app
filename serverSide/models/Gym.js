var mongoose = require('mongoose')
var Schema   = mongoose.Schema


var climbSchema = new Schema({
	section: String,
	grade: String,
	color: String,
	rating: Number,
	_gym: {type: Number, ref: "Gym" }
})

//create gymSchema
var gymSchema = new Schema({
	// _id: Number,
	name: String,
	address: String,
	users: [{type: Schema.Types.ObjectId, ref: "User" }],
	climbs: [{type: Schema.Types.ObjectId, ref: "Climb" }]
})


//export user model to be used elsewhere
var Climb = mongoose.model('Climb', climbSchema)
var Gym = mongoose.model('Gym', gymSchema)



module.exports = {Gym: Gym, Climb: Climb}


