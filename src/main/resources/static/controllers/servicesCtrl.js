app.controller("servicesCtrl",function($rootScope,$scope,$log,$http,$location){

  $scope.services=[];
  $http.get("http://localhost:8080/services").then(function(response){
    $scope.services=response.data._embedded.services;
  })

  $scope.showService=function(id){
    $log.log("id je "+id);
    $location.path("/services/"+id);
  }
})
