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
	vm.updateUser = updateUser
	vm.error = null

	// check to see if a user is logged in on every request. $rootScope is a service of angular
	$rootScope.$on('$stateChangeStart', function() {
		vm.loggedIn = authFactory.isLoggedIn()
		vm.getUser()
		vm.error = null
	})

	function logout(){
		console.log('trigger from frontend')
		authFactory.logout()
		$state.go('loggedout')

	}

	function getUser(){
		authFactory.getUser() //$http.get('/api/me')
		.then(function(response){
			// console.log("GETUSER RESPONSE =====",response)
			vm.user = response.data

			//Graph functions start


			parseInt("10")
			console.log(vm.user.climbs)
			var grades = []

			grades = vm.user.climbs.map(function(climb){return parseInt(climb.grade.slice(1))})
			console.log(grades)
			var total_grades = [];
			for (var i=0; i<11; i++){total_grades[i]=0}

	for (var i=0; i<grades.length; i++){
	total_grades[grades[i]] = total_grades[grades[i]]+1

	}

  // if (vm.user.climbs.date == **range of dates**){
	// 	var
	// }

	// Climb 20 routes
	$('#example6')
	.progress({
		value: vm.user.climbs.length
	})

	// V2 Challenge
	$('#V2challenge')
	.progress({
		value: total_grades[2]
	})




			var data = [{
					"label" : "V0" ,
					"value" : total_grades[0]
				} ,
				{
						"label" : "V1" ,
						"value" : total_grades[1]
				} ,
				{
							"label" : "V2" ,
							"value" : total_grades[2]
				} ,
				{
								"label" : "V3" ,
								"value" : total_grades[3]
				} ,
				{
								"label" : "V4" ,
								"value" : total_grades[4]
				} ,
				{
								"label" : "V5" ,
								"value" : total_grades[5]
				} ,
				{
								"label" : "V6" ,
								"value" : total_grades[6]
				} ,
				{
								"label" : "V7" ,
								"value" : total_grades[7]
				} ,
				{
								"label" : "V8" ,
								"value" : total_grades[8]
				} ,
				{
								"label" : "V9" ,
								"value" : total_grades[9]
				} ,
				{
								"label" : "V10" ,
								"value" : total_grades[10]
				} ,

			];

		var convertedData = [];
		data.forEach(function(item){
				convertedData.push([item.label, item.value]);
		});

		var chart = c3.generate({

				// size: {
				// width: 640
				// }
				axis: {
					y: {
						label: {
						text: 'Number of Climbs',
						position: "inner-middle"
					},
						tick: {
							values: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]
						},


					}
				},

				data: {
						columns: convertedData,
						type: 'bar'
				}
		});





		})
	}
	function updateUser(){
		console.log('updateUser function hitting')
		authFactory.updateUser(vm.user)
		.then(function(response){
			if(response.data.success){
				// vm.getUser()
				console.log('update user success')
				$state.go('user-home')
			} else{
				// console.log('update did not work')
				vm.error = response.data.message
			}
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

}
