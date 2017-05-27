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
	$log.log("priority:",$scope.request.priority);
	// Komentar - ovo trenutno stoji zbog toga sto nismo sigurni na sta se odnosi i da li je za zahtjeve potrebna hitnost
	$scope.request.urgency=0;
	$http.post("http://localhost:8080/requests/add",$scope.request).then(function(response3){
		$log.log("uspjesno dodan zahtjev");
		$log.log($scope.request);
		$location.path("/reqm");
	});
}

$scope.odustani=function(){

	$location.path("/requestmanager");
}

})
