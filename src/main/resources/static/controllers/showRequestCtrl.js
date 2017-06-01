app.controller('showRequestCtrl',function($scope,$http,$location,$log,$routeParams){
  $scope.request={}
  $scope.urgency=["Velika","Srednja","Mala"];
  $scope.influence=["Veliki","Srednji","Mali"];

  $http.get('http://localhost:8080/requests/getbyid/'+$routeParams.id).then(function(response){
    $scope.request=response.data;
  })

  $scope.dajNacinPrijave=function(id){
    if(id==1) return "Telefon";
    else if(id==2) return "E-mail";
    else return "Web aplikacija"
  }
})
