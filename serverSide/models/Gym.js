var mongoose = require('mongoose')
var Schema   = mongoose.Schema

//create gymSchema
var gymSchema = new Schema({
	// _id: Number,
	name: String,
	address: String,
	users: [{type: Schema.Types.ObjectId, ref: "User" }]
})

var Gym = mongoose.model('Gym', gymSchema)

module.exports = Gym
