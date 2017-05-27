app.controller('managerAddRequestCtrl',function($http,$log,$rootScope,$scope,$route,$location){

$scope.user={};
$scope.request={};
$scope.urgency=["Velika","Srednja","Mala"];
$scope.influence=["Veliki","Srednji","Mali"];
$scope.requestUrgency="";
$scope.requestInfluence="";
$scope.departments=[];
$scope.requestId={};
$scope.services={};


if($rootScope.username!=null){
	$log.log($rootScope.username);
	$http.get("http://localhost:8080/users/search/findByUsername?username="+$rootScope.username).then(function(response){
		$scope.request.user=response.data;
	})
	$http.get("http://localhost:8080/departments/all").then(function(response){
		$scope.departments=response.data;
	})
}

$scope.ispuni=function(username){
$http.get("http://localhost:8080/users/search/findByUsername?username="+username).then(function(response){
	$scope.user=response.data;
	$scope.request.user=response.data;
	})
}

$scope.evidentirajZahtjev=function(){
	$log.log($rootScope.username);

	if($scope.requestUrgency=="Velika" && $scope.requestInfluence=="Veliki"){
		$scope.request.priority=1;
	} else if($scope.requestUrgency=="Velika" && $scope.requestInfluence=="Srednji"){
		$scope.request.priority=2;
	} else if($scope.requestUrgency=="Velika" && $scope.requestInfluence=="Mali"){
		$scope.request.priority=3;
	} else if($scope.requestUrgency=="Srednja" && $scope.requestInfluence=="Veliki"){
		$scope.request.priority=2;
	} else if($scope.requestUrgency=="Srednja" && $scope.requestInfluence=="Srednji"){
		$scope.request.priority=3;
	} else if($scope.requestUrgency=="Srednja" && $scope.requestInfluence=="Mali"){
		$scope.request.priority=4;
	} else if($scope.requestUrgency=="Mala" && $scope.requestInfluence=="Veliki"){
		$scope.request.priority=3;
	} else if($scope.requestUrgency=="Mala" && $scope.requestInfluence=="Srednji"){
		$scope.request.priority=4;
	} else if($scope.requestUrgency=="Mala" && $scope.requestInfluence=="Mali"){
		$scope.request.priority=5;
	} else{
		$scope.request.priority=5;
	}
	$log.log("priority:",$scope.request.priority);/*
	$http.get("http://localhost:8080/incidents/search/countIncidentsByPriority?priority="+$scope.request.priority).then(function(response1){
		$scope.request.urgency=response1.data+1;
		$log.log("redoslijed rjesavanja:",$scope.request.urgency);
		$http.get("http://localhost:8080/statuses/search/findByStatus?status=Nerijesen").then(function(response2){
			$scope.request.status=response2.data;

			$http.post("http://localhost:8080/requests/add",$scope.request).then(function(response3){
				$log.log("uspjesno dodan zahtjev");
				$log.log($scope.request);
				//$location.path("/reqm");
			});
		});
	});*/
	$log.log($scope.request);
}

$scope.odustani=function(){

	$location.path("/requestmanager");
}

})
