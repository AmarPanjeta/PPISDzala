app.controller('navigationCtrl',function($rootScope,$log,$location,$scope,$http,$route){



  if(localStorage.hasOwnProperty("username")){
    $rootScope.username=localStorage.getItem("username");
  }
  else{
  $rootScope.username=null;
}

  $log.log("username je "+$rootScope.username);

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

 /* $scope.profile=function(){
    $location.path("/useraccount");
  }*/


$scope.imaZahtjeva=function(){
return $rootScope.numberOfRequests!=0;
}

});
