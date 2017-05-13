app.controller('incidentMngCtrl',function($http,$log,$rootScope,$scope,$route,$location){
	$scope.user={};
	$scope.incidents={};
	$scope.aktuelniKlik=0;

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
		$http.get("http://localhost:8080/incidents").then(function(response){
			$scope.incidents=response.data;
			
		})
	}

	$scope.sakrijAktuelne=function(){
		$scope.aktuelniKlik=0;
	}

	
})