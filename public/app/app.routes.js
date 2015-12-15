angular.module('topOutRouter', ['ui.router'])
  // .config([interceptor])
  .config(['$stateProvider', '$urlRouterProvider', MainRouter])

// add navbar directive later

// interceptor
// function interceptor($httpProvider){
// 	$httpProvider.interceptors.push('authInterceptorFactory')
// }


function MainRouter($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '../templates/welcome.html',
			controller: 'MainController as mainCtrl'
		})
		.state('loggedOut', {
			url: '/logout',
			templateUrl: '../templates/welcome.html',
			controller: 'MainController as mainCtrl'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: '../templates/signup.html',
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
