appControllers.controller("flightListCtrl",
	["$scope", function($scope){

		$scope.flights = [];

		$.ajax("http://127.0.0.1:3000/api/flight",{
			method: "GET",
			success: function(data, textStatus, jqXHR){

				$scope.flights = data;
				$scope.$apply();
			}
		})
		
}])