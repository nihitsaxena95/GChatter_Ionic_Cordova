angular.module("gChat").controller("blogCntrl", function($scope, blogFac, authda) {
	$scope.blogs = blogFac.all;
	console.log($scope.blogs);
	$scope.blog = {};
	$scope.blog.post = "";
	$scope.comments = {};
	$scope.comments.post = "";
	$scope.authdata = authda.getAuth();
	switch($scope.authdata.auth.provider){
		case  "password"  :
			console.log("password");
			console.log($scope.authdata.password.email);
			$scope.blog.user = $scope.authdata.password.email;
			$scope.comments.user = $scope.authdata.password.email;
			break;
		case  "google"  :
			console.log($scope.authdata.google.displayName);
			$scope.blog.user = $scope.authdata.google.displayName;
			$scope.comments.user = $scope.authdata.google.displayName;
			break;
		case  "facebook" :
			console.log("facebook");
			console.log($scope.authdata.facebook.displayName);
			$scope.blog.user = $scope.authdata.facebook.displayName;
			$scope.comments.user = $scope.authdata.facebook.displayName;
			break;
		
	};
	$scope.postb = function() {
		if(($scope.blog.post).length == 0) {

		} else {
		blogFac.create($scope.blog);
		$scope.blog.post = "" ;
	}
}
	$scope.getpost = function(id) {
		if(($scope.comments.post).length == 0) {

		} else {
		//console.log(blogFac.get(id));
		$scope.com = blogFac.comment(id);
		$scope.com.$add($scope.comments);
		//$scope.blog.comments.post = "";
		$scope.comments.post = "";
	}
}
	$scope.delpost = function(id) {
		$scope.com = blogFac.get(id);
		$scope.com.$remove();
}
$scope.delcomm = function(id1, id) {
	
	$scope.coom = blogFac.getcomm(id1);
	console.log(id);
}
$scope.edit = function(id) {
	$scope.com = blogFac.get(id);
	console.log($scope.com);
}
});

angular.module("gChat").factory("blogFac", function($firebaseArray, $firebaseObject){
	var ref = new Firebase("https://luminous-heat-6185.firebaseio.com");
	var blogs = $firebaseArray(ref.child('blog'));
	console.log(ref);
	var chatFac = {
			all: blogs,
			create: function (blog) {
			return blogs.$add(blog);
			},
			get: function (blogId) {
				return $firebaseObject(ref.child('blog').child(blogId));
			},
			delete: function (blog1) {
				return blogs.$remove(blog1);
			},
			comment: function(BlogId) {
				return $firebaseArray(ref.child('blog').child(BlogId).child('comments'));
			},
			getcomm : function(blogId) {
				return $firebaseArray(ref.child('blog').child(blogId).child('comments'));	
			}

		};
		
		return chatFac;
});