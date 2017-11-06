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
	$scope.incident={};

	 $scope.labels = ["Aktivni incidenti", "Zatvoreni incidenti"];

 	 $scope.options={responsive: false,
					 maintainAspectRatio: false}

 $scope.options2={responsive: false,
					 maintainAspectRatio: true}



	 $scope.labelsBAR = ['2015', '2016', '2017'];
  $scope.series = ['Rijeseni', 'Nerijeseni'];

  $scope.dataBAR = [
    [56, 55, 40],
    [86, 27, 90]
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
				$scope.dataBAR = [
					[0, 0, $scope.closedInc],
					[0, 0, $scope.activeInc]
				];
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
	$scope.rijesiIncident=function(id){
		$log.log("id je:",id);
		$location.path("/solveincident/"+id);
	}

	$scope.popraviIncident=function(id){
		$log.log("id je:",id);
		$location.path("/fixincident/"+id);
	}

	$scope.prikaziZatvoreniIncident=function(id){
		$location.path("/showincident/"+id);
	}

	$scope.izvjestaji=function(){
		$location.path("/reports");
	}
	$scope.zauzmiIncident=function(id){

		$http.get("http://localhost:8080/incidents/take?id="+id+"&idUser="+$scope.user.id).then(function(response){

			$scope.prikaziAktuelne();
		})

	}

	$scope.oslobodiIncident=function(id){

		$http.get("http://localhost:8080/incidents/release?id="+id).then(function(response){
			$scope.prikaziAktuelne();
		})

	}

	$scope.zauzeto=function(taken){
		if(taken!=0) return true;
		return false;
	}

	$scope.zauzetoOdKorisnika=function(taken){
		if(taken==$scope.user.id) return true;
		return false;
	}

	$scope.generisiIzvjestaj=function(){
		stats={};

		$http.get("http://localhost:8080/incidents/stats").then(function(response){
			stats=response.data;
			var doc = new jsPDF()

			doc.text('Izvjestaj', 10, 10)

			doc.text('Broj incidenata:'+stats.number,10,22);

			doc.text('Broj rijesenih:'+stats.fixed,10,32);

			doc.text('Broj otvorenih:'+stats.open,10,42);

			doc.text('Broj pogresnih prijava:'+stats.falseIncidents,10,52);

			doc.save('izvjestaj.pdf')
		})

	}
})
