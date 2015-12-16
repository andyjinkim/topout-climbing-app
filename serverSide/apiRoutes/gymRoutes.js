// var express     = require('express')
// var apiRouter   = express.Router()
// var mongoose    = require('mongoose')
// var Gym        = require('../models/Gym')
// var gymController = require('../controllers/gymController')

// apiRouter.get('/', function(req,res){
// 	res.json({message: "Api routes are working."})
// })

// //create a gym
// apiRouter.route('/gyms')
// 	.post(gymController.create)

// //auth middleware
// apiRouter.use(function(req, res, next){
// 	// checking in multiple places for the JWT!
// 	var token = req.body.token || req.param('token') || req.headers['x-access-token']

// 	// if we find the token, let's use mySpecialSecret to try and decode it.
// 	if(token){
// 		jwt.verify(token, superSecret, function(err, decoded){
// 			if(err){
// 				res.status(403).send({success: false, message: "forbidden, token can't be decoded"})
// 			} else {
// 				req.decoded = decoded
// 				next()
// 			}
// 		})
// 	} else {
// 		res.status(403).send({success: false, message: "no token, try again"})
// 	}

// 	//this token checker going to run EVERY time our API is hit
// 	//we want to check if the user is logged in here
// 	console.log("checking if user is logged in")
// })

// //get all gyms route
// apiRouter.route('/gyms')
// 	.get(gymController.index)

// //get current user route
// apiRouter.route('/me')
// 	.get(function(req, res){
// 		console.log(res)
// 		res.json(req.decoded)
// 	})

// //update or delete current user route
// apiRouter.route('/gyms/:gym_id')
// 	.get(gymController.show)

// 	.put(gymController.update)

// 	.delete(gymController.destroy)

// //export apiRouter to be used in controller
// module.exports = apiRouter
