app.controller('userInfoCtrl', function($scope, $http, $rootScope, $log){
	$scope.usluge=[];
	$scope.zahtjevi=[];
	$scope.statusIncs=[];
	$scope.incidenti=[];
	$scope.prikaz='nista'; 
	$scope.prijavaIncidentaZaUsluguId;
	$scope.selIdx= -1;

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
	
	$scope.prikaziPrijavuIncidenta=function(uslugaId)
	{
		if($scope.prikaz!='prijavaIncidenta') $scope.prikaz='prijavaIncidenta';
		else $scope.prikaz='nista';

		$scope.prijavaIncidentaZaUsluguId=uslugaId;
	}

	$scope.prijaviIncidentUnos=function()
	{
		$scope.incident.contactMethod = ($scope.incident.contact_method=="email"? 1:2);
		$scope.incident.userId=$rootScope.id;
		$scope.incident.serviceId=$scope.prijavaIncidentaZaUsluguId;

		$http.post('http://localhost:8080/incidents/reportincident', $scope.incident).then(function(response){
			$log.log(response);
		});

	}

	$scope.prijaviZahtjevZaUslugom=function(){
		$scope.request.contactMethod = ($scope.request.contact_method=="email"? 1:2);
		$scope.request.reportMethod = 1;

		$http.post('http://localhost:8080/requests/'+$rootScope.id+'/addRequest',$scope.request).then(function(response)
		{
			$scope.zahtjevi=response.data;
		});

	}

	$scope.selectIncident=function(inc,idx){
		if($scope.selectedIncident!=null){
			$scope.selectedIncident=null;
		}

		else{
			$scope.selectedIncident=inc;
			$scope.selIdx=idx;
		}	
	}

	$scope.isSelInc=function(inc){
		return $scope.selectedIncident===inc;
	}

	$scope.prikaziDodavanjeZahtjevaZaUslugom=function()
	{
		if($scope.prikaz!='prijavaUsluge') $scope.prikaz='prijavaUsluge';
		else $scope.prikaz='nista';

	}

	$scope.prikaziStatusUsluga=function()
	{
		$http.get('http://localhost:8080/requests/userRequest?userid='+$rootScope.id).then(function(res)
			{
				$scope.zahtjevi=res.data;
			});

		if($scope.prikaz!='statusiUsluga') $scope.prikaz='statusiUsluga';
		else $scope.prikaz='nista';
	}

	$scope.prikaziStatusIncidenata=function()
	{
		$http.get("http://localhost:8080/incidents/userIncident?userid="+$rootScope.id).then(function(response){
			$scope.statusIncs=response.data;
			$log.log(response.data);
		});

		if($scope.prikaz!='statusiIncidenata') $scope.prikaz='statusiIncidenata';
		else $scope.prikaz='nista';
	}

});