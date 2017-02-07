// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('gChat', ['ionic', 'firebase', 'ngCordova'])

.run(function($ionicPlatform, $location, $ionicPopup, $cordovaGeolocation) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	//$cordovaPlugin.someFunction().then(success,err);
	$cordovaGeolocation.getCurrentPosition().then();
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }
  });
   var firstVisit = localStorage.getItem('firstVisit');
  if (!firstVisit) {
    $location.url('/');
  }
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('login', {
		url : '/',
		templateUrl : 'views/login/login.html',
		controller : 'loginCntrl'
	})
	.state('dash', {
		url : '/dash',
		templateUrl : 'views/dash/dash.html',
		controller : 'dashCntrl'
	})
	.state('/register', {
		url : '/register',
		templateUrl : 'views/login/register.html',
		controller : 'loginCntrl'
	})
	.state('/chat', {
		url : '/chat',
		templateUrl : 'views/chat/chat.html',
		controller : 'chatCntrl'
	})
	.state('/blog', {
		url : '/blog',
		templateUrl : 'views/blog/blog.html',
		controller : 'blogCntrl'
	})
	.state('/image', {
		url : '/image',
		templateUrl : 'views/imageupload/imageupload.html',
		controller : 'imgCntrl'
	})
	.state('/loci', {
		url : '/loci',
		templateUrl : 'views/locwise/locwise.html',
		controller : 'locCntrl'
	})
	.state('/locsel', {
		url : '/locsel',
		templateUrl : 'views/locsel/locsel.html',
		controller : 'locselCntrl'
	})
	.state('/lochat', {
		url : '/lochat',
		templateUrl : 'views/lochat/lochat.html',
		controller : 'lochatCntrl'
	});
  $urlRouterProvider.otherwise('/');
});