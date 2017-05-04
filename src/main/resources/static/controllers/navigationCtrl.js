app.controller('navigationCtrl',function($rootScope,$log,$location,$scope,$http,$route){

  $rootScope.greeting = '';
  $rootScope.token = null;
  $rootScope.error = null;
  $rootScope.roleUser = false;
  $rootScope.roleAdmin = false;
  $rootScope.roleFoo = false;
  $rootScope.test="";
  $rootScope.numberOfRequests=0;

  if(localStorage.hasOwnProperty("username")){
    $rootScope.username=localStorage.getItem("username");
  
  }

  var self = this;

	self.tab = function(route) {
		return $route.current && route === $route.current.controller;
	};

  $scope.logged=function(){
    return $rootScope.username!==null;
  };

  $scope.logout=function(){
    $rootScope.username=null;
    localStorage.removeItem("username");
    $location.path("/");
  };

  $scope.profile=function(){
    $location.path("/");
  }


  $scope.ucitajZahtjeve=function(){
      if($rootScope.token!==null){
        $scope.userName=$rootScope.userName;
        $http.get("http://localhost:8080/users/search/findByUsername?username="+$scope.userName).then(function(response){
           $scope.user=response.data;


           $http.get("http://localhost:8080/relations/search/getnumberofrequests?id="+$scope.user.id).then(function(response){
            $rootScope.numberOfRequests=response.data;
           })
      })
    }
  }

$scope.imaZahtjeva=function(){
return $rootScope.numberOfRequests!=0;
}

});
