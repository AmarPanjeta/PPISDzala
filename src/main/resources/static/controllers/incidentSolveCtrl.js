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
	$scope.imaOdgovora=false;



	$scope.loggedIn = function() {
      return $rootScope.username !== null;
	}

	if($rootScope.username!=null){
		$log.log($rootScope.username);
		
		$http.get("http://localhost:8080/users/search/findByUsername?username="+$rootScope.username).then(function(response){
			$scope.user=response.data;
			$http.get("http://localhost:8080/incidents/getincidentbyid?id="+$routeParams.id).then(function(response1){
				$scope.incident=response1.data;
				if($scope.incident.reportMethod==1){
					$scope.methodR="Telefon";
				}else if($scope.incident.reportMethod==2){
					$scope.methodR="Email";
				}


				if($scope.incident.contactMethod==1){
					$scope.methodC="Telefon";
				}else if($scope.incident.contactMethod==2){
					$scope.methodC="Email";
				}

				$http.get("http://localhost:8080/departments/all").then(function(response2){
					$scope.departments=response2.data;
					$scope.findInDepartments();
					$log.log("odjel je",$scope.incident.department);
					$http.get("http://localhost:8080/statuses/all").then(function(response3){
						$scope.statuses=response3.data;
						$scope.findInStatuses();
					})
				})
			});
		})
	}
$scope.povezani=function(){
	if($scope.connection==1){
		$http.get("http://localhost:8080/incidents/getmainincidents").then(function(response){
			$scope.mainIncidents=response.data;
		})
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



})