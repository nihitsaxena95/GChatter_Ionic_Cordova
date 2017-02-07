angular.module('gChat').controller('imgCntrl', ['$scope', '$cordovaCamera','$ionicPlatform','imgFac','authda','$cordovaGeolocation','$http','$ionicPopup', function($scope, $cordovaCamera, $ionicPlatform, imgFac, authda, $cordovaGeolocation, $http, $ionicPopup) {
$scope.images = imgFac.all ;
$scope.imgdata = {};
 	$scope.comments = {};
	$scope.authdata = authda.getAuth();
	switch($scope.authdata.auth.provider){
		case  "password"  :
			console.log("password");
			console.log($scope.authdata.password.email);
			$scope.imgdata.user = $scope.authdata.password.email;
			$scope.comments.user = $scope.authdata.password.email;
			break;
		case  "google"  :
			console.log($scope.authdata.google.displayName);
			$scope.imgdata.user = $scope.authdata.google.displayName;
			$scope.comments.user = $scope.authdata.google.displayName;
			break;
		case  "facebook" :
			console.log("facebook");
			console.log($scope.authdata.facebook.displayName);
			$scope.imgdata.user = $scope.authdata.facebook.displayName;
			$scope.comments.user = $scope.authdata.facebook.displayName;
			break;
		
	};
	$scope.imgdata.date = new Date();
	//console.log($scope.date);
	var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.lat = position.coords.latitude;
	  $scope.long = position.coords.longitude;
	  console.log($scope.lat +" "+ $scope.long);
	var url = "http://nominatim.openstreetmap.org/reverse?lat=" +$scope.lat + "&lon=" +$scope.long + "&format=json";
	$http.get(url)
	.then(function(res) {
		$scope.data = res;
		console.log($scope.data);
	
	
	$scope.imgdata.loc = $scope.data.data.address.city;
	});
},function(err) {console.log(err)});
$ionicPlatform.ready(function() {
		
$scope.uploadGallery = function() {
		console.log('upload is called');

	   var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
			$cordovaCamera.getPicture(options).then(function(imageData) {
				$scope.imgdata.image = imageData ;
        }, function(error) {
            console.error(error);
        });
    }
	$scope.uploadCamera = function() {
		console.log('upload is called');

	   var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
			$cordovaCamera.getPicture(options).then(function(imageData) {
				$scope.imgdata.image = imageData ;
        }, function(error) {
            console.error(error);
        });
    }
	$scope.post = function() {
	imgFac.create($scope.imgdata);
	}
	
	$scope.getpost = function(id) {
		//console.log(blogFac.get(id));
		$scope.com = imgFac.comment(id);
		$scope.com.$add($scope.comments);
	}
	$scope.delpost = function(id) {
		$scope.com = imgFac.get(id);
		$scope.com.$remove();
}

	});
}]);

angular.module("gChat").factory("imgFac", function($firebaseArray, $firebaseObject){
	var ref = new Firebase("https://luminous-heat-6185.firebaseio.com");
	var imgs = $firebaseArray(ref.child('image'));
	console.log(ref);
	var chatFac = {
			all: imgs ,
			create: function (img) {
			return imgs.$add(img);
			},
			get: function (imgId) {
				return $firebaseObject(ref.child('image').child(imgId));
			},
			delete: function (img1) {
				return imgs.$remove(img1);
			},
			comment: function(imgId) {
				return $firebaseArray(ref.child('image').child(imgId).child('comments'));
			}
		};
		return chatFac;
});