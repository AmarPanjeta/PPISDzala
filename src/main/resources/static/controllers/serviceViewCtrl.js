app.controller("serviceViewCtrl",function($rootScope,$scope,$log,$http,$routeParams){
  $log.log($routeParams.id)
  $scope.service={};
  $http.get("http://localhost:8080/services/"+$routeParams.id).then(function(response){
    $scope.service=response.data;
  });
})
