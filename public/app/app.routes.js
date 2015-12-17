angular.module('topOutRouter', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', MainRouter])
  .run(['$state', function ($state) {}])
function MainRouter($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '../templates/welcome.html',
			controller: 'MainController as mainCtrl'
		})
		.state('loggedout', {
			url: '/logout',
			templateUrl: '../templates/welcome.html',
			controller: 'MainController as mainCtrl'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: '../templates/signup.html',
			controller: 'MainController as mainCtrl'
		})
    .state('update', {
      url: '/update',
      templateUrl: '../templates/user-update.html',
      controller: 'MainController as mainCtrl'
    })
		.state('login', {
			url: '/login',
			templateUrl: '../templates/login.html',
			controller: 'MainController as mainCtrl'
		})
		.state('user-home', {
			url: '/user-home',
			templateUrl: '../templates/user-home.html',
			controller: 'MainController as mainCtrl'
		})
		.state('user-profile', {
			url: '/user-profile',
			templateUrl: '../templates/user-profile.html',
			controller: 'MainController as mainCtrl'
		})
		.state('news', {
			url: '/news',
			templateUrl: '../templates/news-feed.html',
			controller: 'MainController as mainCtrl'
		})

		//make sure to add edit user state!!
}
