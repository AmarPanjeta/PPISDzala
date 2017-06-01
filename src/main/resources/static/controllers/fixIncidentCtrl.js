app.controller('fixIncidentCtrl',function($http,$log,$rootScope,$scope,$route,$location,$routeParams){

	$scope.user={};
	$scope.incident={};
	$scope.answers1={};
	$scope.departments={};
	$scope.methodR="";
	$scope.methodC="";
	$scope.connection=2;
	$scope.imaOdgovoraNaInc=false;
	$scope.imaOdgovora=false;
	$scope.incident.answerText="";
	$scope.incident.answer={};
	$scope.answers={};


	$scope.loggedIn = function() {
      return $rootScope.username !== null;
	}

	if($rootScope.username!=null){
		$log.log($rootScope.username);

		$http.get("http://localhost:8080/users/search/findByUsername?username="+$rootScope.username).then(function(response){
			$scope.user=response.data;
			$scope.incident.idAutora=$scope.user.id;
			$http.get("http://localhost:8080/incidents/getincidentbyid?id="+$routeParams.id).then(function(response1){
				$scope.incident=response1.data;
				if($scope.incident.incident!=null){
					$scope.connection=1;
					$http.get("http://localhost:8080/incidents/getmainincidents").then(function(response3){
						$scope.mainIncidents=response3.data;
						$scope.findInMainIncidents();
							

					})
				}
				$log.log("inciiiiii",$scope.incident);
				$scope.dajOdgovore();
			
				if($scope.incident.reportMethod==1){
					$scope.methodR="Telefon";
				}else if($scope.incident.reportMethod==2){
					$scope.methodR="Email";
				}else if($scope.incident.reportMethod==3){
					$scope.methodR="Web aplikacija";
				}


				if($scope.incident.contactMethod==1){
					$scope.methodC="Telefon";
				}else if($scope.incident.contactMethod==2){
					$scope.methodC="Email";
				}else if($scope.incident.contactMethod==3){
					$scope.methodC="Web aplikacija";
				}

				$http.get("http://localhost:8080/departments/all").then(function(response2){
					$scope.departments=response2.data;
					$scope.findInDepartments();
					$log.log("odjel je",$scope.incident.department);
				
				});

			

		
			});
		})
	}

	$scope.dajOdgovore=function(){

	$http.get("http://localhost:8080/incidents/getanswerbyincident?id="+$scope.incident.id).then(function(response){
		$scope.answers1=response.data;
		$log.log("odgovori",$scope.answers1);
		if($scope.answers1.length>0){
			$scope.imaOdgovoraNaInc=true;


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
	})
}

$scope.findInDepartments=function(){
	for(i=0;i<$scope.departments.length;i++){
		if($scope.departments[i].id==$scope.incident.department.id){
			$scope.incident.department=$scope.departments[i];
		}
	}
}

$scope.findInMainIncidents=function(){
	for(i=0;i<$scope.mainIncidents.length;i++){
		if($scope.mainIncidents[i].id==$scope.incident.incident.id){
			$scope.incident.incident=$scope.mainIncidents[i];
			$scope.vratiOdgovore();

			
		}
	}
}


$scope.vratiOdgovore=function(){
	$log.log("petraaa",$scope.incident.incident.id);
	$http.get("http://localhost:8080/incidents/getanswerbyincident?id="+$scope.incident.incident.id).then(function(response){
		$scope.answers=response.data;
		$log.log("odgovori",$scope.answers);
		if($scope.answers.length>0){
			$scope.imaOdgovora=true;

		}
	})
}

$scope.odustani=function(){

	$location.path("/incidentmanager");
}

$scope.povezani=function(){
	$scope.imaOdgovora=false;
	if($scope.connection==1){
		$http.get("http://localhost:8080/incidents/getmainincidents").then(function(response){
			$scope.mainIncidents=response.data;
			$scope.answers={};
		})
	}else if($scope.connection==2){
		$scope.incident.answer={};
		$scope.answers={};
		$scope.incident.incident={};
	}
}

$scope.fixIncident=function(){

	$scope.incident.idAutora=$scope.user.id;

	if($scope.incident.incident!=null){
	$scope.incident.incidentId=$scope.incident.incident.id;
	}else{
		$scope.incident.incidentId=-1;
	}
	if($scope.incident.answer!=null){
		$scope.incident.answerId=$scope.incident.answer.id;
	}else{
		$scope.incident.answerId=-1;
	}
	$log.log("incident odgovor id",$scope.incident.answerId);
	$log.log("incident povezani",$scope.incident.incidentId);
	$log.log("incident text",$scope.incident.answerText);
	$log.log("incident autor id",$scope.incident.idAutora);
	$log.log("incident id",$scope.incident.id);
	$http.post("http://localhost:8080/incidentanswers/fix",$scope.incident).then(function(response){
		$log.log("incident",$scope.incident);
		$location.path("/incidentmanager");
	})
}

})