angular.module('topOutApp', ['topOutRouter', 'mainCtrl', 'authFactory'])
	.config(["$locationProvider", function($locationProvider) {
  		$locationProvider.html5Mode({
  			enabled: true,
  			requireBase: false
		});
	}]);
