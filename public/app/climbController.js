angular.module('climbCtrl', [])
.controller('climbController', climbController)

climbController.$inject = ['$state', 'authFactory', '$rootScope']

function climbController($state, authFactory, $rootScope){
	var vm = this
	var climbObj = {}


console.log('climb controller hit')

	vm.createClimb = function(section,grade,color,rating){
		console.log(vm.user)
		var climb = {
			section:section,
			grade:grade,
			color:color,
			rating:rating
		}
		authFactory.createClimb(climb)
		.then(function(response){
			
			if(response.data.success){
				console.log( "RES", response )
				console.log('response data:',response.data)
				vm.climb = {}
			} else {
<<<<<<< HEAD
				console.log('climb creation did not work')
=======
>>>>>>> 968169b002a983796af08e7cf0610e082359da4b
				vm.error = response.data.message
			}
		})
	}
}
