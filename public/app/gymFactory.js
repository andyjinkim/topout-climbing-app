angular.module('gymFactory', [])
	.factory('gyms', gyms)

gyms.$inject = ["$http"]

function gyms('$http'){
	var gymUrl = '/api/gyms'
	var gyms = {}

	gyms.list = function(){
		return $http.get(gymUrl)
	}

	gyms.show = function(gymId){
		return $http.get(gymUrl + '/' + gymId)
	}

	gyms.addGym = function(data){
		return $http.post(gymUrl,data)
	}

	return gyms
}