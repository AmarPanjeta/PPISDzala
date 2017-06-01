app.controller('userInfoCtrl', function($scope, $http, $rootScope, $log){
	$scope.usluge=[];
	$scope.incidenti=[];
	$scope.prikaz='nista'; 
	var prijavaIncidentaZaUsluguId;

	$scope.prikaziInfo=function(){
		$http.get('http://localhost:8080/user/find?username='+$rootScope.username).then(function(response){
			if(response.data!=null) $scope.usercic=response.data;
		});

		if($scope.prikaz!='info') $scope.prikaz='info';
		else $scope.prikaz='nista';
	}

	$scope.prikaziUsluge=function(){
		$http.get("http://localhost:8080/services/getuserservices?id="+$rootScope.id).then(function(response){
			$scope.usluge=response.data;
			$log.log(response.data);
		});

		if($scope.prikaz!='usluge') $scope.prikaz='usluge';
		else $scope.prikaz='nista';
	}

	$scope.prikaziIncidente=function()
	{
		$http.get("http://localhost:8080/incidents/userIncident?userid="+$rootScope.id).then(function(response){
			$scope.incidenti=response.data;
			$log.log(response.data);
		});

		if($scope.prikaz!='incidenti') $scope.prikaz='incidenti';
		else $scope.prikaz='nista';
	}
	
	$scope.prijavaIncidenta=function(uslugaId)
	{
		if($scope.prikaz!='prijavaIncidenta') $scope.prikaz='prijavaIncidenta';
		else $scope.prikaz='prijavaIncidenta';

		prijavaIncidentaZaUsluguId=uslugaId;
		$log.log(prijavaIncidentaZaUsluguId);
	}

	$scope.prijavaIncidentaUnos=function()
	{
		$scope.incident.contactMethod = ($scope.incident.contact_method=="email"? 1:2);
		$scope.incident.reportMethod = 1;

		$log.log(prijavaIncidentaZaUsluguId);
	}



});