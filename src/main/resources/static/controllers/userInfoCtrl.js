app.controller('userInfoCtrl', function($scope, $http, $rootScope, $log){
	$scope.usluge=[];
	$scope.prikaz=false;
	/*$http.get('http://localhost:8080/services/getuserservices?id='+$scope.user.id).then(function(response){
		$scope.usluge=response.data;
	});*/


	$scope.prikaziInfo=function(){
		$http.get('http://localhost:8080/user/find?username='+$rootScope.username).then(function(response){
			if(response.data!=null) $scope.usercic=response.data;
		});

		var a=!$scope.prikaz;
		$scope.prikaz=a;

	}

	$scope.prikaziUsluge=function(){
		
	}
});