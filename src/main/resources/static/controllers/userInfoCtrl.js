app.controller('userInfoCtrl', function($scope, $http, $rootScope, $log){
	$scope.usluge=[];
	$scope.zahtjevi=[];
	$scope.statusIncs=[];
	$scope.incidenti=[];
	$scope.prikaz='nista'; 
	$scope.prijavaIncidentaZaUsluguId;
	$scope.selIdx= -1;

	//prikaz za tabele redove
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

	/////////////////////////////////////


	//prikazi razl viewa
	$scope.prikaziInfo=function(){
		$http.get('http://localhost:8080/user/find?username='+$rootScope.username).then(function(response){
			if(response.data!=null) $scope.usercic=response.data;
		});

		if($scope.prikaz!='info') $scope.prikaz='info';
	}

	$scope.prikaziUsluge=function(){
		if($scope.prikaz!='uslugeMeni') $scope.prikaz='uslugeMeni';
	}

	$scope.prikaziIncidente=function()
	{
		if($scope.prikaz!='incidentiMeni') $scope.prikaz='incidentiMeni';
	}

	$scope.prikaziMojeIncidente=function()
	{
		$http.get("http://localhost:8080/incidents/userIncident?userid="+$rootScope.id).then(function(response){
			$scope.incidenti=response.data;
			$log.log(response.data);
		});

		if($scope.prikaz!='incidenti') $scope.prikaz='incidenti';
	}
	
	$scope.prikaziPrijavuIncidenta=function(uslugaId)
	{
		if($scope.prikaz!='prijavaIncidenta') $scope.prikaz='prijavaIncidenta';

		$scope.prijavaIncidentaZaUsluguId=uslugaId;
	}

	$scope.prikaziDodavanjeZahtjevaZaUslugom=function()
	{
		if($scope.prikaz!='prijavaUsluge') $scope.prikaz='prijavaUsluge';

	}

	$scope.prikaziStatusUsluga=function()
	{
		$http.get('http://localhost:8080/requests/userRequest?userid='+$rootScope.id).then(function(res)
			{
				$scope.zahtjevi=res.data;
			});

		if($scope.prikaz!='statusiUsluga') $scope.prikaz='statusiUsluga';
	}

	$scope.prikaziStatusIncidenata=function()
	{
		$http.get("http://localhost:8080/incidents/userIncident?userid="+$rootScope.id).then(function(response){
			$scope.statusIncs=response.data;
			$log.log(response.data);
		});

		if($scope.prikaz!='statusiIncidenata') $scope.prikaz='statusiIncidenata';
	}

	$scope.prikaziMojeUsluge=function()
	{
		$http.get("http://localhost:8080/services/getuserservices?id="+$rootScope.id).then(function(response){
			$scope.usluge=response.data;
			$log.log(response.data);
		});

		if($scope.prikaz!='usluge') $scope.prikaz='usluge';
	}


	/////////////////////////////////////////////

	$scope.prijaviIncidentUnos=function()
	{
		$scope.incident.contactMethod = ($scope.incident.contact_method=="email"? 1:2);
		$scope.incident.userId=$rootScope.id;
		$scope.incident.serviceId=$scope.prijavaIncidentaZaUsluguId;

		$http.post('http://localhost:8080/incidents/reportincident', $scope.incident).then(function(response){
			$scope.prikaziMojeIncidente();
		});

	}

	$scope.prijaviZahtjevZaUslugom=function(){
		$scope.request.contactMethod = ($scope.request.contact_method=="email"? 1:2);
		$scope.request.reportMethod = 1;

		$http.post('http://localhost:8080/requests/'+$rootScope.id+'/addRequest',$scope.request).then(function(response)
		{
			$scope.prikaziStatusUsluga();
		});

	}

	$scope.odjaviUslugu=function(uslugaid)
	{
		$log.log(uslugaid);
	}

});