app.controller('loginCtrl',function($http,$log,$rootScope,$scope,$route,$location){
	$rootScope.username="";
	$scope.user={};

	$scope.login=function(){
		
		$http.post("http://localhost:8080/user/login",$scope.user).then(function(response){
			//$log.log("logovan korisnik:"+response.data);
			$rootScope.username=response.data.username;
			localStorage.setItem("username",response.data.username);
			$log.log("mozda");
			$location.path("/");
		},function(response){$log.log("nece");});
	}



})