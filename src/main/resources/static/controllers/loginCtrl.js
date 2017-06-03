app.controller('loginCtrl',function($http,$log,$rootScope,$scope,$route,$location){
	$scope.user={};

	$scope.login=function(){

		$http.post("http://localhost:8080/user/login",$scope.user).then(function(response){
			$log.log(response.data);
			$rootScope.username=response.data.username;
			$rootScope.id=response.data.id;
			$rootScope.type=response.data.type;
			localStorage.setItem("username",response.data.username);
			localStorage.setItem("id",response.data.id);
			localStorage.setItem("type",response.data.type);

			$log.log("mozda");
			$location.path("/");
		},function(response){$log.log("nece");});
	}



})
