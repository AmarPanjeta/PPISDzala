app.controller('navigationCtrl',function($rootScope,$log,$location,$scope,$http,$route){



  if(localStorage.hasOwnProperty("username")){
    $rootScope.username=localStorage.getItem("username");
  }
  else{
  $rootScope.username=null;
  }
  if(localStorage.hasOwnProperty("id")){
    $rootScope.id=localStorage.getItem("id");
  }
  else{
  $rootScope.id=null;
  }
  if(localStorage.hasOwnProperty("type")){
    $rootScope.type=localStorage.getItem("type");
  }
  else{
  $rootScope.type=null;
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
    $rootScope.id=null;
    localStorage.removeItem("id");
    $rootScope.type=null;
    localStorage.removeItem("type");
    $location.path("/");
  };

 /* $scope.profile=function(){
    $location.path("/useraccount");
  }*/
$scope.isAdmin=function(){
  if($rootScope.type==null) return false;
  else if ($rootScope.type!=1) return false;
  return true;
}
$scope.isType=function(id){
  if($rootScope.type==null) return false;
  else if ($rootScope.type!=id) return false;
  return true;
}

$scope.imaZahtjeva=function(){
return $rootScope.numberOfRequests!=0;
}

});
