app.controller('userInfoCtrl', function($scope, $http, $rootScope, $log){
	$scope.usluge=[];
	$scope.zahtjevi=[];
	$scope.statusIncs=[];
	$scope.incidenti=[];
	$scope.prikaz='nista'; 
	$scope.prijavaIncidentaZaUsluguId;
	$scope.selIdx= -1;
	$scope.answerIncident='nema';


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

	$scope.prikazi=function(nesto){
		$scope.prikaz=nesto;

		if($scope.prikaz=='info')
		{
			$http.get('http://localhost:8080/user/find?username='+$rootScope.username).then(function(response){
				if(response.data!=null) $scope.usercic=response.data;
			});
		}

		else if($scope.prikaz=='usluge')
		{
			$http.get("http://localhost:8080/services/getuserservices?id="+$rootScope.id).then(function(response){
				$scope.usluge=response.data;
				$log.log(response.data);
			});
		}

		else if($scope.prikaz=='incidenti')
		{
			$http.get("http://localhost:8080/incidents/userIncident?userid="+$rootScope.id).then(function(response){
				$scope.incidenti=response.data;	
			});
		}

		else if($scope.prikaz=='zahtjevi')
		{
			$http.get('http://localhost:8080/requests/userRequest?userid='+$rootScope.id).then(function(res)
			{
				$scope.zahtjevi=res.data;
			});
		}


	}

	/////////////////////////////////////
	//prikazi razl viewa
	

	/*$scope.prikaziInfo=function(){
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
	}*/
	
	$scope.prikaziPrijavuIncidenta=function(uslugaId)
	{
		$scope.prikazi('prijavaIncidenta');
		$scope.prijavaIncidentaZaUsluguId=uslugaId;
	}

	$scope.prikaziDodavanjeZahtjevaZaUslugom=function()
	{
		if($scope.prikaz!='prijavaUsluge') $scope.prikaz='prijavaUsluge';

	}

	/////////////////////////////////////////////

	$scope.prijaviIncidentUnos=function()
	{
		$scope.incident.contactMethod = ($scope.incident.contact_method=="email"? 1:2);
		$scope.incident.userId=$rootScope.id;
		$scope.incident.serviceId=$scope.prijavaIncidentaZaUsluguId;

		$http.post('http://localhost:8080/incidents/reportincident', $scope.incident).then(function(response){
			$scope.prikazi('incidenti');
		});

	}

	$scope.prijaviZahtjevZaUslugom=function(){
		$scope.request.contactMethod = ($scope.request.contact_method=="email"? 1:2);
		$scope.request.reportMethod = 1;

		$http.post('http://localhost:8080/requests/'+$rootScope.id+'/addRequest',$scope.request).then(function(response)
		{
			$scope.prikazi('zahtjevi');
		});

	}

	$scope.odjaviUslugu=function(uslugaid)
	{
		$http.get('http://localhost:8080/userservice/'+$rootScope.id+'/odjaviuslugu/'+uslugaid).then(function(response){
			$scope.prikazi('usluge');
		});
	}

	$scope.prikaziOdgovorIncidenta=function()
	{
		$http.get('http://localhost:8080/incidents/getanswerbyincident?id='+$scope.selectedIncident.id).then(function(response)
		{	
			if(response.data[0].text!='')
			{
				$scope.incident.odgovor=response.data[0].text;
				$scope.imaOdgovor=true;
				$log.log($scope.incident.odgovor);
			}	

		});

		$log.log($scope.incident.odgovor);
	}
});