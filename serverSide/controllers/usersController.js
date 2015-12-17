var User = require('../models/User')
var Climb = require('../models/Climb')

function index(req, res){
	// function to get all the users
	User.find(function(err, users){
		if(err) res.send(err)
		res.json(users)
	})
}

function create(req, res){
	// create a user
	console.log(req)
	console.log("Creating a user")
	var user = new User()

	user.name = req.body.name
	user.email = req.body.email
	user.password = req.body.password
	user.experience = req.body.experience
	user.points = req.body.points
	user.level = req.body.level
	user.gyms = req.body.gyms
	user.followers = req.body.followers
	user.following = req.body.following

	user.save(function(err){
		if(err){
			if(err.code == 11000){
				return res.json({success: false, message: "username already exists" })
			} else {
				console.log('we made it to here!')
				res.send(err)
			}
		}
		console.log('attempting to send json')
		res.json({success: true, message: "User created, Lets get to climbing!"})
	})
}

function show(req, res){
	//get and show a single user
	User.findById(req.params.user_id, function(err, user){
		if(err) res.send(err)
		console.log( user )
		res.json(user)
	})
}

function update(req, res){
	// update a single user -- update
	User.findById(req.params.user_id, function(err, user){

		var climb = new Climb(req.body)

		if(err) res.send(err)

		if (req.body.name) {
			user.name = req.body.name
		}
		console.log('update in usersctrl hitting', req.body)
		if(req.body.email) 		user.email 		= req.body.email
		if(req.body.password) 	user.password 	= req.body.password
		if(req.body.experience) user.experience = req.body.experience
		if(req.body.gyms) 		user.gyms 		= req.body.gyms
		if(req.body.points) 	user.points 	= req.body.points
		if(req.body.level) 		user.level 		= req.body.level
		if(req.body.followers) 	user.followers 	= req.body.followers
		if(req.body.following) 	user.following 	= req.body.following
		if(req.body.climbs)		user.climbs		= climb

		user.save(function(err){
			if(err) res.send(err)
			res.json({success: true, message: "user has been updated!"})
		})
	})
}

function destroy(req, res){
	// delete a single user
	User.remove({
		_id: req.params.user_id
	}, function(err, user){
		if(err) res.send(err)
		res.json({success: true, message: "User has been deleted!"})
	})
}


//export object to be used in router
module.exports = {
	index: index,
	create: create,
	show: show,
	update: update,
	destroy: destroy
}
