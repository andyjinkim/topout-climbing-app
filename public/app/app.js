angular.module('topOutApp', ['topOutRouter', 'mainCtrl', 'authFactory',])

.directive('navbar', navbar)

  function navbar(){
  var directive = {
    restrict: 'EA',
    templateUrl: 'templates/nav-bar.html'
  }
  return directive
}
