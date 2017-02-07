angular.module('gChat').controller('loginCntrl', ['$scope', '$location','$ionicLoading', '$timeout','authda','$ionicPopup', function ($scope, $location, $ionicLoading, $timeout, authda, $ionicPopup) {
    var ref = new Firebase("https://luminous-heat-6185.firebaseio.com");   
	$scope.user = {};
	$scope.user.username = "";
	$scope.user.password = "";
	$scope.user.username1 = "";
	$scope.user.password1 = "";
	$scope.submit = function(event) {
		event.preventDefault();
		console.log($scope.user.username);
		console.log($scope.user.password);
		$ionicLoading.show({ template: '<span class="icon-spin ion-loading-d"></span> Loading'
	});
		if(($scope.user.username).length == 0 && ($scope.user.password).length == 0) {
			$scope.mess = "Enter Credentials" ;
			$ionicLoading.hide();
		}
		else if(($scope.user.password).length == 0 && ($scope.user.username).length != 0 ) {
			$scope.mess = "Enter password" ; 
			$ionicLoading.hide();
		}
		else if(($scope.user.username).length == 0 && ($scope.user.password).length != 0) {
			$scope.mess = "Enter username";
			$ionicLoading.hide();
		}
		else {
  ref.authWithPassword({
  email : $scope.user.username,
  password : $scope.user.password
}, function(error, authData) {
  if (error) {
	$scope.mess = "Incorrect username or password";
    console.log("Login Failed!", error);
	$ionicLoading.hide();
  } else {
    console.log("Authenticated successfully with payload:", authData);
	 authda.setAuth(authData);
      console.log(authData.password.email);
	  $location.url('/dash');
	  $ionicLoading.hide();
  }
});
  		}
    }
   $scope.create = function(event) {
       event.preventDefault();
    $ionicLoading.show({
    template: '<span class="icon spin ion-loading-d"></span> Loading'
		});
		if(($scope.user.username1).length == 0 && ($scope.user.password1).length == 0) {
			$scope.mess = "Enter Credentials" ;
			$ionicLoading.hide();
		}
		else if(($scope.user.username1).length != 0 && ($scope.user.password1).length == 0) {
			$scope.mess = "Enter password" ; 
			$ionicLoading.hide();
		}
		else if(($scope.user.username1).length == 0 && ($scope.user.password1).length != 0) {
			$scope.mess = "Enter username";
			$ionicLoading.hide();
		}
		else {
		  ref.createUser({
           email : $scope.user.username1,
			password : $scope.user.password1
       }, function(err, user) {
           if(err) {
			   $ionicLoading.hide();
			   console.log(err);
               switch (err.code) {
      case "EMAIL_TAKEN":
        $scope.mess = "The new user account cannot be created because the email is already in use.";
        $ionicLoading.hide();
		break;
      case "INVALID_EMAIL":
        $scope.mess = "The specified email is not a valid email.";
        $ionicLoading.hide();
		break;
      default:
        $scope.mess = "Error creating user:"+err;
           }
		  }
           else {
				$ionicLoading.hide();
                console.log("Successfully created user account with uid:", user);
				authda.setAuth(user);
				var alertPopup = $ionicPopup.alert({
				title: 'User Created Successfully',
				template: 'Login to enjoy services.'
				});

				alertPopup.then(function(res) {
				$location.url('/login');
				
				});		
		   }
       });
		} 
   } 
   
   $scope.facebook = function(event) {
       event.preventDefault();
	   $ionicLoading.show({
    template: '<span class="icon spin ion-loading-d"></span> Loading'
		});
       ref.authWithOAuthPopup("facebook", function(error, authData) {
  if (error) {
	  $ionicLoading.hide();
    $scope.mess = "Authentication Failed!" +error ;
  } else {
    console.log("Authenticated successfully with payload:", authData);
    authda.setAuth(authData);
	$ionicLoading.hide();
	$location.url('/dash');
	  $scope.$apply();
  }
});
   }

   $scope.gmail = function(event) {
       event.preventDefault();
       $ionicLoading.show({
    template: '<span class="icon spin ion-loading-d"></span> Loading'
		});
	   ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
	  $ionicLoading.hide();
	      $scope.mess = "Authentication Failed!" + error;
  } else {
	  $ionicLoading.hide();
    console.log("Authenticated successfully with payload:", authData);
	authda.setAuth(authData);
	$location.url('/dash');
	  $scope.$apply();
  }
});
   }
   
   $scope.newuse = function() {
	   $location.url('/register');
   }
}]);

angular.module("gChat").service("authda", function(){
	var authdata;
	
	return {
		setAuth : function(auth) {
			authdata = auth;
		},
		getAuth : function(auth) {
			return authdata;
		}
	};
});