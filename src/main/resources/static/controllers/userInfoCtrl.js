app.controller('userInfoCtrl', function($scope, $http, $rootScope, $log){
	$scope.usluge=[];
	$scope.incidenti=[];
	$scope.prikaz='nista';

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

	/*$scope.prikazi=function(sta)
	{
		$log.log(sta);
		$scope.prikaz=sta;
	}*/

	$scope.prijavaIncidenta=function()
	{
		if($scope.prikaz!='prijavaIncidenta') $scope.prikaz='prijavaIncidenta';
		else $scope.prikaz='prijavaIncidenta';
	}



});