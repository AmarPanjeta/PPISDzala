app.controller('incidentMngCtrl',function($http,$log,$rootScope,$scope,$route,$location){
	$scope.user={};
	$scope.incidents={};
	$scope.activeInc=0;
	$scope.closedInc=0;
	$scope.allInc=0;
	$scope.closedIncidents={};
	$scope.aktuelniKlik=0;
	$scope.zatvoreniKlik=0;
	$scope.statistikaKlik=0;

	 $scope.labels = ["Aktivni incidenti", "Zatvoreni incidenti"];
 	 
 	 $scope.options={responsive: false,
					 maintainAspectRatio: false}

 $scope.options2={responsive: false,
					 maintainAspectRatio: true}



	 $scope.labelsBAR = ['2011', '2012', '2013', '2014', '2015', '2016', '2017'];
  $scope.series = ['Rijeseni', 'Nerijeseni'];

  $scope.dataBAR = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

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
		$http.get("http://localhost:8080/incidents/active").then(function(response){
			$scope.incidents=response.data;
			$log.log($scope.incidents);
			for(i=0;i<$scope.incidents.length;i++){

				timestamp=$scope.incidents[i].created;
				var date = new Date(timestamp);

				var year = date.getUTCFullYear();
				var month = date.getUTCMonth() + 1; 
				var day = date.getUTCDate();
				var hours = date.getUTCHours();
				var minutes = date.getUTCMinutes();
				var seconds = date.getUTCSeconds();
				$scope.incidents[i].datumPrijave={year,month,day,hours,minutes,seconds};
							
				}
		})
	}

	$scope.sakrijAktuelne=function(){
		$scope.aktuelniKlik=0;
	}

	$scope.prikaziZatvorene=function(){
		$scope.zatvoreniKlik=1;
		$http.get("http://localhost:8080/incidents/closed").then(function(response){
			$scope.closedIncidents=response.data;

				for(i=0;i<$scope.closedIncidents.length;i++){

				timestamp=$scope.closedIncidents[i].created;
				var date = new Date(timestamp);

				var year = date.getUTCFullYear();
				var month = date.getUTCMonth() + 1; // getMonth() is zero-indexed, so we'll increment to get the correct month number
				var day = date.getUTCDate();
				var hours = date.getUTCHours();
				var minutes = date.getUTCMinutes();
				var seconds = date.getUTCSeconds();
				$scope.closedIncidents[i].datumPrijave={year,month,day,hours,minutes,seconds};
							
				}
			
		})
	}

	$scope.sakrijZatvorene=function(){
		$scope.zatvoreniKlik=0;
	}

	$scope.prikaziStatistiku=function(){
		$scope.statistikaKlik=1;

		niz=[];

		$http.get("http://localhost:8080/incidents/search/countIncidents").then(function(response){
			$scope.allInc=response.data;			
		})
		$http.get("http://localhost:8080/incidents/search/countActiveIncidents").then(function(response1){
			$scope.activeInc=response1.data;	
			niz.push(response1.data);	
			
			$http.get("http://localhost:8080/incidents/search/countClosedIncidents").then(function(response2){
				$scope.closedInc=response2.data;	
				niz.push($scope.closedInc);
				$scope.data=niz;		
			})
		})
	


	}

	$scope.sakrijStatistiku=function(){
		$scope.statistikaKlik=0;
	}

	$scope.evidentirajIncident=function(){
		$location.path("/newincident");
	}

	$scope.promjenaPodataka=function(){
		$location.path("/changeprofileinfo");
	}
	
})