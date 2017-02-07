angular.module('gChat').controller('locselCntrl', function($scope, locselFac, $location) {
$scope.cities = ["Noida", "Ghaziabad"];
$scope.getcity = function(city) {
	locselFac.put(city);
	$location.url('/lochat');
}
});

angular.module('gChat').service('locselFac', function() {
	var citi;
	
	return {
		put : function(citii) {
			citi = citii ;
		},
		gut : function(citii) {
			return citi;
		}
	};
});