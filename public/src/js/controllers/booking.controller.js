appControllers.controller("bookingCtrl",
	["$scope", function($scope){
		$scope.isVisible = false;
		$scope.showComplete = false;
		$scope.flID = "",
		$scope.finish = false;
		$scope.flightInfo1= function (flID, flTime, flChair){
			$scope.flID = flID;
			$scope.passTab1 = true;
			$scope.timeResult1 = flTime;
			$scope.total1 = flChair*$scope.adult + flChair*$scope.senior + flChair*$scope.child*75/100;
		}
		$scope.flightInfo2= function (flID, flTime, flChair){
			$scope.passTab2 = true;
			$scope.timeResult2 = flTime;
			$scope.total2 = flChair*$scope.adult + flChair*$scope.senior + flChair*$scope.child*75/100;
		}
		$scope.nextStep = function (value) {
                $scope.showComplete = true;        
                $scope.firstNameResult1 = $scope.firstNameInput1;
                $scope.lastNameResult1 = $scope.lastNameInput1;
                $scope.addressResult1 = $scope.addressInput1;
                $scope.telResult1 = $scope.telInput1;
                $scope.fromLocResult1 = $scope.fromLoc;
                $scope.toLocResult1 = $scope.toLoc;
                $scope.departDayResult1 = $scope.departDay;
                $scope.adultResult1 = $scope.adult;
                $scope.seniorResult1 = $scope.senior;
                $scope.childResult1 = $scope.child;
                $scope.typeResult1 = $scope.type;
                $scope.departDayResult2 = $scope.returnDay;
                $scope.fromLocResult2 = $scope.toLoc;
                $scope.toLocResult2 = $scope.fromLoc;
            }
		$scope.ShowRetDay = function (value) {
                $scope.isVisible = value == "Y";
            }
		$scope.fromLoc = null;
		$scope.toLoc = null;
		$scope.depFlights = [];
		$scope.retFlights = [];
		$scope.groupedLocation = {};
		
		$scope.departDay = "";
		$scope.returnDay = "";
		$scope.adult = "";
		$scope.senior = "";
		$scope.child = "";
		$scope.type = null;
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
		$scope.complete = function(){
			$.ajax("http://127.0.0.1:3000/api/passenger",{
				method: "POST",
				data: {
					firstName: $scope.firstNameInput1,
					lastName: $scope.lastNameInput1,
					address: $scope.addressInput1,
					telephoneNumber: $scope.telInput1,
					flightID: $scope.flID,
				},
				success: function(result) {
                    $rootScope.$broadcast('response', result);
                }
			})
            window.alert("Your booking is completed! Thank you!!!");
            $scope.finish = true;
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
