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
		vm.loggedIn = authFactory.isLoggedIn()
		vm.getUser()
		vm.error = null
	});

	function logout(){
		console.log('trigger from frontend')
		authFactory.logout()
		$state.go('loggedout')
		
	}

	function getUser(){
		authFactory.getUser()
		.then(function(response){
			vm.user = response.data
		})
	}

	function signup(){
		authFactory.signup(vm.user.name, vm.user.email, vm.user.password, vm.user.experience, vm.user.gyms)
		.then(function(response){
			if(response.data.success){
				console.log(vm.user)
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
			console.log(response.data)
			if(response.data.success){
				console.log(response.data)
				//upon successful login redirect user to user-home page
				$state.go("user-home")
			} else {
				vm.error = response.data.message
			}
		})
	}

}
