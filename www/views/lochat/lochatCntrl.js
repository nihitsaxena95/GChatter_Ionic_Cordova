angular.module('gChat').controller('lochatCntrl', ['$scope','locFacd','authda','locselFac', function($scope, locFacd, authda, locselFac) {
	$scope.loca = locselFac.gut();
	$scope.mess = locFacd.set($scope.loca);
	$scope.authdata = authda.getAuth();
	$scope.message = {};
	$scope.message.data = "";
	switch($scope.authdata.auth.provider){
		case  "password"  :
			console.log("password");
			console.log($scope.authdata.password.email);
			$scope.message.user = $scope.authdata.password.email;
			break;
		case  "google"  :
			console.log($scope.authdata.google.displayName);
			$scope.message.user = $scope.authdata.google.displayName;
			break;
		case  "facebook" :
			console.log("facebook");
			console.log($scope.authdata.facebook.displayName);
			$scope.message.user = $scope.authdata.facebook.displayName;
			break;
		
	};
	$scope.post = function() {
		if(($scope.message.data).length == 0) {

		} else {
		locFacd.create($scope.message);
		$scope.message.data = "";
	}
	}
	$scope.delpost = function(id) {
		$scope.com = locFacd.get(id);
		$scope.com.$remove();
}
	}]);

angular.module("gChat").factory("locFacd", function($firebaseArray, $firebaseObject) {
	var ref;
	var locationmess;
	var locationi;
	var chatFac = {
			set : function(loci) {
				locationi = loci;
				ref = new Firebase("https://luminous-heat-6185.firebaseio.com");
				locationmess = $firebaseArray(ref.child(locationi)); 
				return $firebaseArray(ref.child(locationi)); 
			},
			//all: locationmess,
			create: function (message) {
			return locationmess.$add(message);
			},
			get: function (messageId) {
				return $firebaseObject(ref.child(locationi).child(messageId));
			},
			delete: function (message1) {
				return messages.$remove(message1);
			}
		};
		return chatFac;
});