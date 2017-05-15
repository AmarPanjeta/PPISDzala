app.controller('incidentMngCtrl',function($http,$log,$rootScope,$scope,$route,$location){
	$scope.user={};
	$scope.incidents={};
	$scope.closedIncidents={};
	$scope.aktuelniKlik=0;
	$scope.zatvoreniKlik=0;
	$scope.statistikaKlik=0;

	$scope.loggedIn = function() {
      return $rootScope.username !== null;
	}

	if($rootScope.username!=null){
		$log.log($rootScope.username);
		$log.log($scope.aktuelniKlik);
		$http.get("http://localhost:8080/users/search/findByUsername?username="+$rootScope.username).then(function(response){
			$scope.user=response.data;
		})
	}

	$scope.prikaziAktuelne=function(){
		$scope.aktuelniKlik=1;
		$http.get("http://localhost:8080/incidents/active").then(function(response){
			$scope.incidents=response.data;
			$log.log($scope.incidents);
			for(i=0;i<$scope.incidents.length;i++){

				timestamp=$scope.incidents[i].created;
				var date = new Date(timestamp);

				var year = date.getUTCFullYear();
				var month = date.getUTCMonth() + 1; 
				var day = date.getUTCDate();
				var hours = date.getUTCHours();
				var minutes = date.getUTCMinutes();
				var seconds = date.getUTCSeconds();
				$scope.incidents[i].datumPrijave={year,month,day,hours,minutes,seconds};
							
				}
		})
	}

	$scope.sakrijAktuelne=function(){
		$scope.aktuelniKlik=0;
	}

	$scope.prikaziZatvorene=function(){
		$scope.zatvoreniKlik=1;
		$http.get("http://localhost:8080/incidents/closed").then(function(response){
			$scope.closedIncidents=response.data;

				for(i=0;i<$scope.closedIncidents.length;i++){

				timestamp=$scope.closedIncidents[i].created;
				var date = new Date(timestamp);

				var year = date.getUTCFullYear();
				var month = date.getUTCMonth() + 1; // getMonth() is zero-indexed, so we'll increment to get the correct month number
				var day = date.getUTCDate();
				var hours = date.getUTCHours();
				var minutes = date.getUTCMinutes();
				var seconds = date.getUTCSeconds();
				$scope.closedIncidents[i].datumPrijave={year,month,day,hours,minutes,seconds};
							
				}
			
		})
	}

	$scope.sakrijZatvorene=function(){
		$scope.zatvoreniKlik=0;
	}

	$scope.prikaziStatistiku=function(){
		$scope.statistikaKlik=1;
		$http.get("http://localhost:8080/incidents").then(function(response){
			$scope.incidents=response.data;

			
			
		})
	}

	$scope.sakrijStatistiku=function(){
		$scope.statistikaKlik=0;
	}

	$scope.evidentirajIncident=function(){
		$location.path("/newincident");
	}

	$scope.promjenaPodataka=function(){
		$location.path("/changeprofileinfo");
	}
	
})