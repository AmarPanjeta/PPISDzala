app.controller('incidentCtrl',function($http,$log,$rootScope,$scope,$route,$location){

$scope.user={};
$scope.incident={};
$scope.urgency=["Velika","Srednja","Mala"];
$scope.influence=["Veliki","Srednji","Mali"];
$scope.incidentUrgency="";
$scope.incidentInfluence="";
$scope.departments={};
$scope.incidentId={};
$scope.services={};
$scope.incident.repetition=0;
if($rootScope.username!=null){
		$log.log($rootScope.username);
		
		$http.get("http://localhost:8080/users/search/findByUsername?username="+$rootScope.username).then(function(response){
			$scope.incident.evidenterUser=response.data;
		})

		$http.get("http://localhost:8080/departments/all").then(function(response){
			$scope.departments=response.data;


		})



		
	}

$scope.ispuni=function(username){
$http.get("http://localhost:8080/users/search/findByUsername?username="+username).then(function(response){
	$scope.user=response.data;
	$scope.incident.user=response.data;
	$http.get("http://localhost:8080/services/getuserservices?id="+$scope.user.id).then(function(response1){
		$scope.services=response1.data;
	})
})
}

$scope.prijaviIncident=function(){

	$log.log($rootScope.username);

    

	$http.get("http://localhost:8080/incidents/search/findById?id="+$scope.incidentId).then(function(response){
			$scope.incident.incident=response.data;
		})


	if($scope.incidentUrgency=="Velika" && $scope.incidentInfluence=="Veliki"){
		$scope.incident.priority=1;
	} else if($scope.incidentUrgency=="Velika" && $scope.incidentInfluence=="Srednji"){
		$scope.incident.priority=2;
	} else if($scope.incidentUrgency=="Velika" && $scope.incidentInfluence=="Mali"){
		$scope.incident.priority=3;
	} else if($scope.incidentUrgency=="Srednja" && $scope.incidentInfluence=="Veliki"){
		$scope.incident.priority=2;
	} else if($scope.incidentUrgency=="Srednja" && $scope.incidentInfluence=="Srednji"){
		$scope.incident.priority=3;
	} else if($scope.incidentUrgency=="Srednja" && $scope.incidentInfluence=="Mali"){
		$scope.incident.priority=4;
	} else if($scope.incidentUrgency=="Mala" && $scope.incidentInfluence=="Veliki"){
		$scope.incident.priority=3;
	} else if($scope.incidentUrgency=="Mala" && $scope.incidentInfluence=="Srednji"){
		$scope.incident.priority=4;
	} else if($scope.incidentUrgency=="Mala" && $scope.incidentInfluence=="Mali"){
		$scope.incident.priority=5;
	} else{
		$scope.incident.priority=5;
	}
	$log.log("priority:",$scope.incident.priority);
	$http.get("http://localhost:8080/incidents/search/countIncidentsByPriority?priority="+$scope.incident.priority).then(function(response1){
		$scope.incident.urgency=response1.data+1;
		$log.log("redoslijed rjesavanja:",$scope.incident.urgency);
	})
	$http.get("http://localhost:8080/statuses/search/findByStatus?status='Nerijesen'").then(function(response){
		$scope.incident.status=response.data;
	})

	$http.post("http://localhost:8080/incidents/dodaj",$scope.incident).then(function(response){
		$log.log("uspjesno dodan incident");
	$location.path("/incidentmanager");
	})
}

$scope.odustani=function(){
	
	$location.path("/incidentmanager");
}

})