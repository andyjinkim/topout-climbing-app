angular.module('mainCtrl', [])
.controller('MainController', MainController)

MainController.$inject = ['$state', 'authFactory', '$rootScope']

function MainController($state, authFactory, $rootScope){
	var vm = this
	vm.user = {}
	vm.loggedIn = null
	vm.signup = signup
	vm.login = login
	vm.logout = logout
	vm.getUser = getUser
	vm.error = null



	// check to see if a user is logged in on every request. $rootScope is a service of angular
	$rootScope.$on('$stateChangeStart', function() {
		console.log('in the $rootScope.$on function')
		vm.loggedIn = authFactory.isLoggedIn()
		console.log("user is logged in:", vm.loggedIn)
		authFactory.getUser()
		console.log('hitting the authFactory.getUser')
			.then(function(data){
				console.log('hitting the .then promise: ', data);
				vm.user = data.data
				console.log("LOOK:", vm.user)
			})
	});

	function logout(){
		console.log('trigger from frontend')
		authFactory.logout()
		$state.go('loggedout')

	}

	function getUser(){
		authFactory.getUser() //$http.get('/api/me')
		.then(function(response){
			console.log(response)
			vm.user = response.data

		})
	}

	function signup(){
		authFactory.signup(vm.user.name, vm.user.email, vm.user.password, vm.user.experience, vm.user.gyms)
		.then(function(response){
			if(response.data.success){
				// console.log(vm.user)
				vm.login()
			} else {
				console.log('sign up did not work')
				vm.error = response.data.message
			}
		})
	}

	function login(){
		authFactory.login(vm.user.email, vm.user.password)
		.then(function(response){
			if(response.data.success){
				//upon successful login redirect user to user-home page
				$state.go("user-home")
			} else {
				vm.error = response.data.message
			}
		})
	}

	function updateUser(){
		console.log('updateUser function hitting')
		authFactory.updateUser(vm.user.name, vm.user.email, vm.user.password, vm.user.experience, vm.user.gyms)
		.then(function(response){
			if(response.data.success){
				$state.go('user-home')
			} else{
				console.log('update did not work')
				vm.error = response.data.message
			}
		})
	}

}
