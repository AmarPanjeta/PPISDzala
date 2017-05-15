app.controller('profileCtrl',function($http,$log,$rootScope,$scope,$route,$location){
	$scope.user={};

	if($rootScope.username!=null){
		$scope.username=$rootScope.username;
		 $http.get("http://localhost:8080/users/search/findByUsername?username="+$scope.username).then(function(response){
			$scope.user=response.data;

			$log.log("ucitao je kontrole:",$scope.user.id);

			})
	}



	 $scope.sacuvaj=function(){
	 	$log.log($scope.user.id);
		$http.put("http://localhost:8080/users/"+$scope.user.id,$scope.user).then(function(response){
		  $location.path("/incidentmanager");
		})
	}

	$scope.odustani=function(){
		$location.path("/incidentmanager");
	}
})
