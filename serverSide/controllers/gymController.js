var Gym = require('../models/Gym')

function index(req, res){
	// function to get all the users
	User.find(function(err, gyms){
		if(err) res.send(err)
		res.json(gyms)
	})
}

function create(req, res){
	// create a gym
	// console.log(req)
	console.log("Creating a gym")
	var gym = new Gym.Gym
	gym.name = req.body.name
	gym.address = req.body.address
	gym.users = req.body.users
	gym.climbs = req.body.climbs

	gym.save(function(err,gym){
		if(err){
			if(err.code == 11000){
				return res.json({success: false, message: "gymname already exists" })
			} else {
				console.log('we made it to here!')
				res.send(err)
			}
		}
		console.log('attempting to send json')
		res.json({success: true, message: "gym created, Lets get to climbing!", gym: gym})
	})
}

function show(req, res){
	//get and show a single user
	Gym.findById(req.params.user_id, function(err, gym){
		if(err) res.send(err)
		res.json(gym)
	})
}

// function update(req, res){
// 	// update a single user -- update
// 	User.findById(req.params.user_id, function(err, user){
// 		if(err) res.send(err)

// 		if (req.body.name) {
// 			user.name = req.body.name			
// 		} 	
// 		if(req.body.email) user.email = req.body.email
// 		if(req.body.password) user.password 	= req.body.password
// 		if(req.body.experience) user.experience = req.body.experience
// 		if(req.body.gyms) 			user.gyms 			= req.body.gyms
// 		if(req.body.points) 		user.points 		= req.body.points
// 		if(req.body.level) 			user.level 			= req.body.level
// 		if(req.body.followers) 	user.followers 	= req.body.followers
// 		if(req.body.following) 	user.following 	= req.body.following

// 		user.save(function(err){
// 			if(err) res.send(err)
// 			res.json({success: true, message: "user has been updated!"})
// 		})
// 	})
// }

function destroy(req, res){
	// delete a single user
	Gym.remove({
		_id: req.params.user_id
	}, function(err, gym){
		if(err) res.send(err)
		res.json({success: true, message: "Gym has been deleted!"})
	})
}


//export object to be used in router
module.exports = {
	index: index,
	create: create,
	show: show,
	// update: update,
	destroy: destroy
}