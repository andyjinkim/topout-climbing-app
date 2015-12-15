angular
	.module('topOutApp', ['ui.router'])
	.config(interceptor)
	.config(MainRouter)

function interceptor($httpProvider){
	$httpProvider.interceptors.push('authInterceptorFactory')
}

function MainRouter($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'templates/index.html',
			controller: 'mainCtrl'
		})
		.state('loggedOut', {
			url: '/loggedOut',
			templateUrl: 'templates/index.html',
			controller: 'mainCtrl'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'templates/signup.html',
			controller: 'mainCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'templates/login.html',
			controller: 'mainCtrl'
		})
		.state('user-home', {
			url: '/user-home',
			templateUrl: 'templates/user-home.html',
			controller: 'mainCtrl'
		})
		.state('user-profile', {
			url: '/user-profile',
			templateUrl: 'templates/user-profile.html',
			controller: 'mainCtrl'
		})
		.state('news', {
			url: '/news',
			templateUrl: 'templates/news-feed.html',
			controller: 'mainCtrl'
		})
		//make sure to add edit user state!!
}