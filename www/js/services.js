angular.module("gChat").service("data", function(){
	var authdata = [];
	
	return {
		setAuth : function(auth) {
			authdata.push(auth);
		}
		getAuth : function(auth) {
			return authdata;
		}
	};
});