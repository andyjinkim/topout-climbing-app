var express     = require('express')
var apiRouter   = express.Router()
var mongoose    = require('mongoose')
var User        = require('../models/User')
var jwt         = require('jsonwebtoken')
var	superSecret = 'project4'
var usersController = require('../controllers/usersController')

apiRouter.get('/', function(req,res){
	res.json({message: "Api routes are working."})
})

// route to generate sample user
apiRouter.post('/sample', function(req, res) {
	// look for the user named test
	User.findOne({ 'email': 'test@gmail.com' }, function(err, user) {
		// if there is no test user, create one
		if (!user) {
			var sampleUser = new User()
			sampleUser.name = 'test'
			sampleUser.email = 'test@gmail.com'
			sampleUser.password = 'test'

			sampleUser.save();
		} else {
			console.log(user);

			// if there is a test user, update the password
			user.password = 'test'
			user.save();
		}
		res.send('done')
	})
})
// route to authenticate a user
apiRouter.route('/authenticate')
	.post(function(req, res){
	console.log('trying to generate a JWT', req.body )
	//find the user in db
	User.findOne({
		email: req.body.email
	}).exec(function(err, user){
		if(err) throw err
		if(!user){
			res.json({success: false, message: "Auth failed, user not valid"})
		} else if(user){
			// check passwords
			var validPassword = user.comparePassword(req.body.password)
			if(!validPassword){
				res.json({success: false, message: "Auth failed, invalid password"})
			} else {
				// password is good!
				// var user  = user
				var token = jwt.sign({
					name: user.name,
					email: user.email
				}, superSecret, {
					expiresInMinutes: 1440
				})
				// grant token
				res.json({
					success: true,
					message: "enjoy your token!",
					token: token,
					user : user
				})
			}
		}
	})
})

//create a user
apiRouter.route('/users')
	.post(usersController.create)

//auth middleware
apiRouter.use(function(req, res, next){
	// checking in multiple places for the JWT!
	var token = req.body.token || req.param('token') || req.headers['x-access-token']

	// if we find the token, let's use mySpecialSecret to try and decode it.
	if(token){
		jwt.verify(token, superSecret, function(err, decoded){
			if(err){
				res.status(403).send({success: false, message: "forbidden, token can't be decoded"})
			} else {
				req.decoded = decoded
				next()
			}
		})
	} else {
		res.status(403).send({success: false, message: "no token, try again"})
	}

	// this token checker going to run EVERY time our API is hit
	// we want to check if the user is logged in here
	console.log("checking if user is logged in")
})

//get all users route
apiRouter.route('/users')
	.get(usersController.index)

//get current user route
apiRouter.route('/me')
	.get(function(req, res){
		console.log(res)
		res.json(req.decoded)
	})

//update or delete current user route
apiRouter.route('/users/:user_id')
	.get(usersController.show)

	.put(usersController.update)

	.delete(usersController.destroy)

//export apiRouter to be used in controller
module.exports = apiRouter
