angular.module('climbCtrl', [])
.controller('climbController', climbController)

climbController.$inject = ['$state', 'authFactory', '$rootScope']

function climbController($state, authFactory, $rootScope){
	var vm = this
	var climbObj = {}


console.log('climb controller hit')

	vm.createClimb = function(section,grade,color,rating){
		
		var climb = {
			section:section,
			grade:grade,
			color:color,
			rating:rating
		}
		console.log(climb)
		authFactory.createClimb(climb)
		.then(function(response){
			
			if(response.data.success){
				console.log( "RES", response )
				console.log('response data:',response.data)
				vm.climb = {}
			} else {
				vm.error = response.data.message
			}
		})
	}
}
