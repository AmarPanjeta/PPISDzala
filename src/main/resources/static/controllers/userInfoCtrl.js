app.controller('userInfoCtrl', function($scope, $http, $rootScope, $log){
	$scope.usluge=[];
	$scope.zahtjevi=[];
	$scope.statusIncs=[];
	$scope.incidenti=[];
	$scope.prikaz='nista';
	$scope.prijavaIncidentaZaUsluguId;
	$scope.selIdx= -1;
	$scope.selIdxZ= -1;
	$scope.selIdxU= -1;

	$scope.answers1=[];
	$scope.answers2=[];
	$scope.answerIncident={};


	//prikaz za tabele redove
	$scope.selectIncident=function(inc,idx){
		if($scope.selectedIncident!=null){
			$scope.selectedIncident=null;
		}

		else{
			$scope.selectedIncident=inc;
			$scope.selectedIncident.odgovor='';
			$scope.dajOdgovoreIncident();
			$scope.selIdx=idx;
		}
	}

	$scope.isSelInc=function(zah){
		return $scope.selectedIncident===zah;
	}






	$scope.selectRequest=function(zah,idx){
		if($scope.selectedRequest!=null){
			$scope.selectedRequest=null;
		}

		else{
			$scope.selectedRequest=zah;
			$scope.selectedRequest.odgovor='';
			$scope.dajOdgovoreZahtjev();
			$scope.selIdxZ=idx;
		}
	}

	$scope.isSelReq=function(zah){
		return $scope.selectedRequest===zah;
	}

	$scope.selectUsluga=function(usl,idx){
		if($scope.selectedUsluga!=null){
			$scope.selectedUsluga=null;
		}

		else{
			$scope.selectedUsluga=usl;
			$scope.selIdxU=idx;
		}
	}

	$scope.isSelUsl=function(usl){
		return $scope.selectedUsluga===usl;
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
			$http.get("http://localhost:8080/incidents/usersactive?userid="+$rootScope.id).then(function(response){
				$scope.incidenti=response.data;

			});
		}

		else if($scope.prikaz=='sviincidenti')
		{
			$http.get("http://localhost:8080/incidents/userIncident?userid="+$rootScope.id).then(function(response){
				$scope.incidenti=response.data;

			});
		}

		else if($scope.prikaz=='zahtjevi')
		{
			$http.get('http://localhost:8080/requests/usersactive?userid='+$rootScope.id).then(function(res)
			{
				$scope.zahtjevi=res.data;
			});
		}

		else if($scope.prikaz=='svizahtjevi')
		{
			$http.get('http://localhost:8080/requests/userRequest?userid='+$rootScope.id).then(function(res)
			{
				$scope.zahtjevi=res.data;
			});
		}

	}

	$scope.dajOdgovoreIncident=function(){

		$http.get("http://localhost:8080/incidents/getanswerbyincident?id="+$scope.selectedIncident.id).then(function(response){
			$scope.answers1=response.data;

			if($scope.answers1.length>0){
				$scope.imaOdgovor=true;

				for(i=0;i<$scope.answers1.length;i++){

					timestamp=$scope.answers1[i].created;
					var date = new Date(timestamp);

					var year = date.getUTCFullYear();
					var month = date.getUTCMonth() + 1;
					var day = date.getUTCDate();
					var hours = date.getUTCHours();
					var minutes = date.getUTCMinutes();
					var seconds = date.getUTCSeconds();
					$scope.answers1[i].datumPrijave={year,month,day,hours,minutes,seconds};


				}
			}

			else {
				$scope.imaOdgovor=false;
			}
		})
	}

	$scope.zatvoriIncident=function(){
		$http.get("http://localhost:8080/incidents/close/"+$scope.selectedIncident.id).then(function(response){
			$http.get("http://localhost:8080/incidents/usersactive?userid="+$rootScope.id).then(function(response){
				$scope.incidenti=response.data;
			});
		})
	}

	$scope.zatvoriZahtjev=function(){
		$http.get("http://localhost:8080/requests/close/"+$scope.selectedRequest.id).then(function(response){
			$http.get('http://localhost:8080/requests/usersactive?userid='+$rootScope.id).then(function(res)
			{
				$scope.zahtjevi=res.data;
			});
		})
	}

	$scope.dajOdgovoreZahtjev=function(){

		$http.get("http://localhost:8080/requestanswer/getanswersbyrequest/"+$scope.selectedRequest.id).then(function(response){
			$scope.answers2=response.data;

			if($scope.answers2.length>0){
				$scope.imaOdgovorZ=true;

				for(i=0;i<$scope.answers2.length;i++){

					timestamp=$scope.answers2[i].created;
					var date = new Date(timestamp);

					var year = date.getUTCFullYear();
					var month = date.getUTCMonth() + 1;
					var day = date.getUTCDate();
					var hours = date.getUTCHours();
					var minutes = date.getUTCMinutes();
					var seconds = date.getUTCSeconds();
					$scope.answers2[i].datumPrijave={year,month,day,hours,minutes,seconds};


				}
			}

			else {
				$scope.imaOdgovorZ=false;
			}
		})
	}

	$scope.prikaziPrijavuIncidenta=function(uslugaId)
	{
		$scope.prikazi('prijavaIncidenta');
		$scope.prijavaIncidentaZaUsluguId=uslugaId;
	}

	$scope.prikaziDodavanjeZahtjevaZaUslugom=function()
	{
		if($scope.prikaz!='prijavaUsluge') $scope.prikaz='prijavaUsluge';

	}

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

		$http.post('http://localhost:8080/requests/reportrequest',{userId:$rootScope.id,title:$scope.request.title,description:$scope.request.description,contactMethod:$scope.request.contactMethod}).then(function(response)
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

	$scope.dodajOdgovorNaIncident=function(noviOdgovorText)
	{
		$scope.answerIncident.text=noviOdgovorText;
		$scope.answerIncident.autorId=$rootScope.id;
		$scope.answerIncident.incId=$scope.selectedIncident.id;

		$log.log($scope.answerIncident);
		$http.post('http://localhost:8080/incidentanswers/add',$scope.answerIncident).then(function(response)
		{
			$log.log(response);
			$scope.prikazi('incidenti');
		});
	}

	$scope.dodajOdgovorNaZahtjev=function(noviOdgovorText)
	{
		$scope.answerIncident.text=noviOdgovorText;
		$scope.answerIncident.autorId=$rootScope.id;
		$scope.answerIncident.requestId=$scope.selectedRequest.id;

		$log.log($scope.answerIncident);
		$http.post('http://localhost:8080/requestanswer/add',$scope.answerIncident).then(function(response)
		{
			$scope.prikazi('zahtjevi');
		});
	}
});
