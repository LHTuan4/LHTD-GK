var app = angular.module("app",['appComponents', 'appControllers']);
var appComponents = angular.module("appComponents",['appControllers']);
var appControllers = angular.module("appControllers",[]);
appComponents.component("booking",{
	templateUrl: "../partials/booking.html",
	controller: "bookingCtrl"
})
appComponents.component("flightList",{
	templateUrl: "../partials/flightlist.html",
	controller: "flightListCtrl"
})
appControllers.controller("bookingCtrl",
	["$scope", function($scope){
		$scope.isVisible = false;
		$scope.totalChair = 0;
		$scope.fee = 0;
		$scope.showComplete = false;
		$scope.passTab2 = false;
		$scope.flID = "",
		$scope.finish = false;
		$scope.flightInfo1= function (flID, flTime, flChair){
			$scope.flID = flID;
			$scope.passTab1 = true;
			$scope.timeResult1 = flTime;
			if($scope.type==='Y') {$scope.total1 = flChair*$scope.adult + flChair*$scope.senior + flChair*$scope.child*75/100}
			if($scope.type==='C') {$scope.total1 = (flChair*$scope.adult + flChair*$scope.senior + flChair*$scope.child*75/100)*2}		
		}
		$scope.flightInfo2= function (flID, flTime, flChair){
			$scope.flID2 = flID;
			$scope.passTab2 = true;
			$scope.timeResult2 = flTime;
			if($scope.type==='Y') {$scope.total2 = flChair*$scope.adult + flChair*$scope.senior + flChair*$scope.child*75/100}
			if($scope.type==='C') {$scope.total2 = (flChair*$scope.adult + flChair*$scope.senior + flChair*$scope.child*75/100)*2}
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
			$scope.totalChair = $scope.adult + $scope.senior + $scope.child;
			if($scope.totalChair === 0){
				window.alert("Please choose number of passenger!!!")
			}
			else{
				if($scope.fromLoc === $scope.toLoc){
					window.alert("Depart place and Return place must be different!!!")
				}
				else{
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
			}
			
		}
		$scope.complete = function(){
			$scope.totalChair = $scope.adult + $scope.senior + $scope.child;
			$.ajax("/api/flight/" + $scope.flID,{
            	method: "PUT",
            	data:{
            		chair: $scope.totalChair
            	},
            	success: function(result) {
            	//==================================================================
            		if($scope.passTab2 === true){
		    			$.ajax("/api/flight/" + $scope.flID2,{
			            	method: "PUT",
			            	data:{
			            		chair: $scope.totalChair
			            	},
		        			success: function(result) {
			            		$.ajax("http://127.0.0.1:3000/api/passenger",{
									method: "POST",
									data: {
										firstName: $scope.firstNameResult1,
										lastName: $scope.lastNameResult1,
										address: $scope.addressResult1,
										telephoneNumber: $scope.telResult1,
										flightID: $scope.flID2,
										payment: $scope.total2,
									},
								})
								$.ajax("http://127.0.0.1:3000/api/passenger",{
									method: "POST",
									data: {
										firstName: $scope.firstNameResult1,
										lastName: $scope.lastNameResult1,
										address: $scope.addressResult1,
										telephoneNumber: $scope.telResult1,
										flightID: $scope.flID,
										payment: $scope.total1,
									},
								})
								window.alert("Thank you for your booking. Have fun!!!");
								window.location.reload();
		        			},
		        			error: function(xhr, textStatus, errorThrown){
		        				window.alert("Not enough seat for your return flight, please choose another flight!!!");
		        			}
		       			})
		    		}
            	//==================================================================	
            		else{
            			$.ajax("http://127.0.0.1:3000/api/passenger",{
						method: "POST",
						data: {
							firstName: $scope.firstNameResult1,
							lastName: $scope.lastNameResult1,
							address: $scope.addressResult1,
							telephoneNumber: $scope.telResult1,
							flightID: $scope.flID,
							payment: $scope.total1,
						},
					})
					window.alert("Thank you for your booking. Have fun!!!");
					window.location.reload();
            		}
				//========================================================
				//========================================================
            	},
            	error: function(xhr, textStatus, errorThrown){
            		window.alert("Not enough seat for your depart flight, please choose another flight!!!")
            	},
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