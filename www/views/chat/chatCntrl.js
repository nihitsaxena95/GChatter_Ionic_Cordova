angular.module("gChat").controller("chatCntrl",['$scope', 'chatFac','authda','$ionicModal', function($scope, chatFac, authda, $ionicModal) {
	$scope.mess = chatFac.all;
	console.log($scope.mess);
	$scope.authdata = authda.getAuth();
	$scope.message = {};
	$scope.message.mess = "";
	
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
	
	console.log($scope.authdata);
	$scope.sendmess = function() {
		if(($scope.message.mess).length == 0) {
			
	} else{
		chatFac.create($scope.message);
		$scope.message.mess = "";
	}
	}
	$scope.delpost = function(id) {
		$scope.com = chatFac.get(id);
		$scope.com.$remove();
	}
	$scope.id = "";
	$scope.editpost = function(id) {
		$scope.id = id;
		$ionicModal.fromTemplateUrl('views/chat/pop.html', {
      	scope: $scope,
      	animation: 'slide-in-up'
    }).then(function(modal) {
     $scope.modal = modal;
      $scope.modal.show();
      console.log($scope.newmess);
    });
	}
	$scope.cancel = function() {
		console.log($scope.newmess);
		 $scope.modal.hide();
	}
	$scope.editp = function(id) {
		console.log($scope.newmess);
		$scope.edit = chatFac.edit($scope.id);
		console.log($scope.edit);
		$scope.edit.update({mess : $scope.newmess});
	}
}]);

angular.module("gChat").factory("chatFac", function($firebaseArray, $firebaseObject) {
	var ref = new Firebase("https://luminous-heat-6185.firebaseio.com");
	var messages = $firebaseArray(ref.child('messages'));
	console.log(messages);
	var chatFac = {
			all: messages,
			create: function (message) {
			return messages.$add(message);
			},
			get: function (messageId) {
				return $firebaseObject(ref.child('messages').child(messageId));
			},
			delete: function (message1) {
				return messages.$remove(message1);
			},
			edit : function (messageId) {
				return ref.child('messages').child(messageId);
			}
		};
		
		return chatFac;
});