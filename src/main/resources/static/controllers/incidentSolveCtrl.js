app.controller('incidentSolveCtrl',function($http,$log,$rootScope,$scope,$route,$location,$routeParams){
	$scope.user={};
	$scope.incident={};
	$scope.priorities=[1,2,3,4,5];
	$scope.departments={};
	$scope.connection=0;
	$scope.mainIncidents={};
	$scope.statuses={};
	$scope.methodR="";
	$scope.methodC="";
	$scope.answers={};
	$scope.answers1={};
	$scope.imaOdgovoraNaInc=false;
	$scope.imaOdgovora=false;
	$scope.incidentanswers={};
	$scope.ansBody={};



	$scope.loggedIn = function() {
      return $rootScope.username !== null;
	}

	if($rootScope.username!=null){
		$log.log($rootScope.username);

		$http.get("http://localhost:8080/users/search/findByUsername?username="+$rootScope.username).then(function(response){
			$scope.user=response.data;
			$http.get("http://localhost:8080/incidents/getincidentbyid?id="+$routeParams.id).then(function(response1){
				$scope.incident=response1.data;
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
				})

				$http.get("http://localhost:8080//statuses/all").then(function(response3){
					$scope.statuses=response3.data;
					$scope.findInStatuses();
					$log.log("status je",$scope.incident.status);
				})
			});
		})
	}
$scope.povezani=function(){
	if($scope.connection==1){
		$http.get("http://localhost:8080/incidents/getmainincidents").then(function(response){
			$scope.mainIncidents=response.data;
			$scope.answers={};
		})
	}else if($scope.connection==2){
		$scope.answers={};
		$scope.incident.incident={};
	}
}

$scope.odustani=function(){

	$location.path("/incidentmanager");
}

$scope.findInDepartments=function(){
	for(i=0;i<$scope.departments.length;i++){
		if($scope.departments[i].id==$scope.incident.department.id){
			$scope.incident.department=$scope.departments[i];
		}
	}
}


$scope.findInStatuses=function(){
	for(i=0;i<$scope.statuses.length;i++){
		if($scope.statuses[i].id==$scope.incident.status.id){
			$scope.incident.status=$scope.statuses[i];
		}
	}
}

$scope.ispisi=function(){
	$log.log($scope.incident.incident.title);
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


$scope.editIncident=function(){
	$http.post("http://localhost:8080/incidentanswers/edit",$scope.incident).then(function(response){
		$location.path("/incidentmanager");
	})
}


$scope.rijesenIncident=function(){

	if($scope.incident.answer.id==null && $scope.incident.answer.text!=""){

		$scope.ansBody.text=$scope.incident.answer.text;
		$scope.ansBody.autorId=$scope.user.id;
		$scope.ansBody.incId=$scope.incident.id;

		$http.post("http://localhost:8080/incidentanswers/add",$scope.ansBody).then(function(response){

				$http.post("http://localhost:8080/incidentanswers/update",$scope.incident).then(function(response1){
					$log.log("incident",$scope.incident);
					$location.path("/incidentmanager");
				});
		})

	}
	else{

		$http.post("http://localhost:8080/incidentanswers/addbyid?incId="+$scope.incident.id+"&ansId="+$scope.incident.answer.id).then(function(response3){

			$http.post("http://localhost:8080/incidentanswers/update",$scope.incident).then(function(response1){
					$log.log("incident",$scope.incident);
					$location.path("/incidentmanager");
			});


		})

	}


}


})
