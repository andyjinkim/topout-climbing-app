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
  console.log("REQ", req.body, req.decoded);
   if ( req.body ) {
    
     var newClimb = new Climb( req.body )
     User.findOne( { email: req.decoded.email } )
      .exec( function( err, user ) {
        if ( err ) {
          res.json( err )
        } else if ( user ){
          user.climbs.push( newClimb )
          user.save( function( err, user ) {
              if ( err ) {
                res.json( err )
              } else {
                console.log('hhhehlehecalcelacelkac ;kne')
                res.json( { message: "Success!", user: user } )

              }
            } )
        } else {
          res.json( "Couldn't find user" )
        }
      } )
   }
}

// function show(req, res){
// 	//get and show a single user
// 	User.findById(req.params.user_id, function(err, user){
// 		if(err) res.send(err)
// 		console.log( user )
// 		res.json(user)
// 	})
// }
//
// function update(req, res){
// 	// update a single user -- update
// 	User.findById(req.params.user_id, function(err, user){
//
// 		var climb = new Climb(req.body)
//
// 		if(err) res.send(err)
//
// 		if (req.body.name) {
// 			user.name = req.body.name
// 		}
// 		console.log('update in usersctrl hitting', req.body)
// 		if(req.body.email) 		user.email 		= req.body.email
// 		if(req.body.password) 	user.password 	= req.body.password
// 		if(req.body.experience) user.experience = req.body.experience
// 		if(req.body.gyms) 		user.gyms 		= req.body.gyms
// 		if(req.body.points) 	user.points 	= req.body.points
// 		if(req.body.level) 		user.level 		= req.body.level
// 		if(req.body.followers) 	user.followers 	= req.body.followers
// 		if(req.body.following) 	user.following 	= req.body.following
// 		if(req.body.climbs)		user.climbs		= climb
//
// 		user.save(function(err){
// 			if(err) res.send(err)
// 			res.json({success: true, message: "user has been updated!"})
// 		})
// 	})
// }
//
// function destroy(req, res){
// 	// delete a single user
// 	User.remove({
// 		_id: req.params.user_id
// 	}, function(err, user){
// 		if(err) res.send(err)
// 		res.json({success: true, message: "User has been deleted!"})
// 	})
// }
//
//
//export object to be used in router
module.exports = {
	// index: index,
	create: create
	// show: show,
	// update: update,
	// destroy: destroy
}
