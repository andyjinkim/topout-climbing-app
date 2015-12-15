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
			templateUrl: 'templates/index.html'
		})
		.state('loggedOut', {
			url: '/loggedOut',
			templateUrl: 'templates/index.html'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'templates/signup.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'templates/login.html'
		})
		.state('user-home', {
			url: '/user-home',
			templateUrl: 'templates/user-home.html'
		})
		.state('user-profile', {
			url: '/user-profile',
			templateUrl: 'templates/user-profile.html'
		})
		.state('news', {
			url: '/news',
			templateUrl: 'templates/news-feed.html'
		})
		//make sure to add edit user state!!
}