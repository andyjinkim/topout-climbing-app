angular.module('topOutApp', ['topOutRouter', 'mainCtrl', 'authFactory', 'climbCtrl'])
.config(interceptor)
.directive('navbar', navbar)

function interceptor($httpProvider){
	$httpProvider.interceptors.push('authInterceptorFactory')
}

function navbar(){
  var directive = {
    restrict: 'EA',
    templateUrl: 'templates/nav-bar.html',
    controller: 'MainController as mainCtrl'
  }
  return directive
}
