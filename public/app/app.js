angular.module('topOutApp', ['topOutRouter', 'mainCtrl', 'authFactory',])
.config(interceptor)
.directive('navbar', navbar)

  function navbar(){
  var directive = {
    restrict: 'EA',
    templateUrl: 'templates/nav-bar.html'
  }
  return directive
}

function interceptor($httpProvider){
	$httpProvider.interceptors.push('authInterceptorFactory')
}
