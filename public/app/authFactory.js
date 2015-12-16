//authTokenFactory for getting token and setting it to "token" in local storage
angular.module('authFactory', [])
	.factory('authTokenFactory', authTokenFactory)
	.factory('authInterceptorFactory', authInterceptorFactory)
	.factory('authFactory', authFactory)

//authFactory for http requests to the api
authFactory.$inject = ['$http', '$q', 'authTokenFactory']
function authFactory($http, $q, authTokenFactory){

	var authFactory = {}

	authFactory.index = function(){
		return $http.get('/api/users')
	}
	// handle login
	authFactory.login = function(email, password){
		return $http.post('/api/authenticate', {
			email: email,
			password: password
		}).then(function(response){
			authTokenFactory.setToken(response.data.token,response.data.user)
			// localStorage.setItem('userData',response.data.user)
			console.log( response.data )
			return response
		})
	}

	authFactory.signup = function(name,email,password,experience,gyms){
		return $http.post( '/api/users', {
			name: name,
			email: email,
			password: password,
			experience: experience,
			gyms: gyms
			// points: points,
			// level: level,
			// followers: followers,
			// following: following
		})
	}

	// handle logout
	authFactory.logout = function(){
		console.log('logout hitting factory')
		localStorage.removeItem('token')
		localStorage.removeItem('userData')
	}

	// check if a user is logged in
	authFactory.isLoggedIn = function(){
		if(authTokenFactory.getToken()){
			return true
		} else {
			return false
		}
	}

	// get that user's info
	authFactory.getUser = function(){
		var userData = localStorage.getItem('userData')
		userData = JSON.parse( userData ) 
		if(authTokenFactory.getToken()){
			console.log('get user authfactory function hitting')
			return $http.get('/api/users/' + userData._id )
		} else {
			return $q.reject({message: 'User has no token'})
		}
	}

	return authFactory
}

authTokenFactory.$inject = ['$window']
function authTokenFactory($window){

	var authTokenFactory = {}
	// get the token
	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token')
	}
	// set the token
	authTokenFactory.setToken = function( token, userData ){
		if(token){
			$window.localStorage.setItem('token', token)
			$window.localStorage.setItem('userData', userData)
		} else {
			$window.localStorage.removeItem( 'token' )
			$window.localStorage.removeItem( 'userData' )
		}
	}
	return authTokenFactory
}

//authInterceptorFactory for setting the token to every single request and redirect if no token
authInterceptorFactory.$inject = ['$q', '$location', 'authTokenFactory']
function authInterceptorFactory($q, $location, authTokenFactory){

	var authInterceptorFactory = {}
	// attach the token to every request
	authInterceptorFactory.request = function(config){
		var token = authTokenFactory.getToken()
		if(token){
			config.headers['x-access-token'] = token;
		}
		return config
	}

	authInterceptorFactory.responseError = function(response){
		if(response.status == 403){
			$location.path('/login')
		}
		return $q.reject(response)
	}
	// redirect if the token doesn't authenticate
	return authInterceptorFactory
}
