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
		$http.get("http://localhost:8080/incidents/search/getActiveIncidents").then(function(response){
			$scope.incidents=response.data;
			$log.log($scope.incidents);
			
		})
	}

	$scope.sakrijAktuelne=function(){
		$scope.aktuelniKlik=0;
	}

	$scope.prikaziZatvorene=function(){
		$scope.zatvoreniKlik=1;
		$http.get("http://localhost:8080/incidents/search/getClosedIncidents").then(function(response){
			$scope.closedIncidents=response.data;
			
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
	
})