appControllers.controller("bookingCtrl",
	["$scope", function($scope){

		$scope.depFlights = [];
		$scope.retFlights = [];
		$scope.groupedLocation = {};
		$scope.fromLoc = null;
		$scope.toLoc = null;
		$scope.departDay = "";
		$scope.returnDay = "";
		$scope.searchBtt = function(){
			var url = "http://127.0.0.1:3000/api/flight?" + 
							"from=" + $scope.fromLoc + 
							"&to=" + $scope.toLoc + 
							"&date=" + $scope.departDay;			
			$.ajax(url,{
				method: "GET",
				success: function(data, textStatus, jqXHR){

					$scope.depFlights = data;
					$scope.$apply();
				}
			})

			var url1 = "http://127.0.0.1:3000/api/flight?" + 
							"from=" + $scope.toLoc + 
							"&to=" + $scope.fromLoc + 
							"&date=" + $scope.returnDay;	
			$.ajax(url1,{
				method: "GET",
				success: function(data, textStatus, jqXHR){

					$scope.retFlights = data;
					$scope.$apply();

				}
			})
		}

		$.ajax("http://127.0.0.1:3000/api/location",{
			method: "GET",
			success: function(data, textStatus, jqXHR){
				
				var region = [];
				region = data.map((location) => location.region);
				region = Array.from(new Set(region));

				$scope.groupedLocation = {};

				region.forEach(function(regionName) {

					$scope.groupedLocation[regionName] = 
						data.filter((location) => location.region === regionName);
							// .map((location) => location.name);
				});

				console.log(Object.keys($scope.groupedLocation))
				$scope.$apply();
			}
		})		
}])
