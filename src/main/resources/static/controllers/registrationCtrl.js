app.controller('registrationCtrl',function($http,$log,$rootScope,$scope,$route,$location){
	$scope.user={};

	$scope.register=function(){
		$scope.user.type=1;
		$scope.user.telephone="03333333";

		$http.post("http://localhost:8080/user/register",$scope.user).then(function(response){
			$log.log("registrovan korisnik:"+$scope.user);
			$location.path("/");
		})
	}
})
