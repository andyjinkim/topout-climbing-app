var mongoose = require('mongoose')
var Schema   = mongoose.Schema
var bcrypt	 = require('bcrypt-nodejs')


//create UserSchema
var UserSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true, unique: true},
	experience: String,
	points: Number,
	level: String,
	followers: [],
	following: [],
	compClimbs: [{type: Schema.Types.ObjectId, ref: "Climb" }],
	// gyms: [{type: Schema.Types.ObjectId, ref: "Climb" }]
	gyms: String
})

//hash password of user before being saved
UserSchema.pre('save',function(next){
	var user = this
	//hash password only if new user or password is updated
	if (!user.isModified('password')) return next()

	bcrypt.hash(user.password,null,null, function(err,hash){
		if(err) return next(err)
		//if no error, set user.password equal to the hash and proceed to next(next()) step
		user.password = hash
		next()
	})
})
//create method to compare password input to stored passwords
UserSchema.methods.comparePassword = function(password){
	var user = this

	return bcrypt.compareSync(password,user.password)
}

UserSchema.methods.completeClimb = function(climb){
	var user = this
	user.compClimbs.push(climb)
	user.save
}
UserSchema.methods.addGym = function(gym){
	var user = this
	user.gyms.push(gym)
	user.save
}
//export user model to be used elsewhere
module.exports = mongoose.model('User', UserSchema)
