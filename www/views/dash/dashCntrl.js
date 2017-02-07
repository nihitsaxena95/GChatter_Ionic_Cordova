angular.module('gChat').controller('dashCntrl', function($scope, $cordovaGeolocation, $http, $ionicPlatform, $timeout, $location, locdata) {
	$ionicPlatform.ready(function() {
	var posOptions = {timeout: 10000, enableHighAccuracy: false};
	$cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.lat = position.coords.latitude;
	  $scope.long = position.coords.longitude;
	  console.log($scope.lat +" "+ $scope.long);
	var url = "http://nominatim.openstreetmap.org/reverse?lat=" +$scope.lat + "&lon=" +$scope.long + "&format=json";
	var url1 = "https://api.forecast.io/forecast/16aa047eb2fb0610171c290c9c38b683/"+$scope.lat+","+$scope.long; 
	$http.get(url)
	.then(function(res) {
		$scope.data = res;
		console.log($scope.data);
		locdata.setloc($scope.data);
	});
$http.get(url1)
	.then(function(res1) {
		$scope.data1 = res1;
		console.log($scope.data1.currently.temperature);
		
	});	
	 }, function(err) {
		$scope.dataerr = "Kindly provide Location access permission to get weather and location update. You will be redirected to the device location Settings";
		$scope.dostuff= function() {
	cordova.plugins.diagnostic.switchToLocationSettings();
	navigator.app.exitApp();
	 navigator.app.loadUrl("file:///android_asset/www/index.html", {wait:2000, loadingDialog:"Wait,Loading App", loadUrlTimeoutValue: 60000});
    }
	$timeout(function(){$scope.dostuff();},5000);
	});
	});
	$scope.chat = function() {
		$location.url('/chat');
	};
	$scope.blog = function() {
		$location.url('/blog');
	};
	$scope.img = function() {
		$location.url('/image');
	};
	$scope.loci = function() {
		$location.url("/loci");
	};
	$scope.dro = function() {
		$location.url("/locsel");
	};
 });
 
 angular.module('gChat').service('locdata', function() {
	var locdata;
		return {
			setloc : function(loc) {
				locdata = loc;
			},
			getloc : function(loc) {
				return locdata;
			}
		}
 });