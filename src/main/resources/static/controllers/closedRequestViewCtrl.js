app.controller('closedRequestViewCtrl',function($scope,$http,$location,$log,$routeParams){
  $http.get('http://localhost:8080/requests/getbyid/'+$routeParams.id).then(function(response){
    $scope.request=response.data;
    $http.get('http://localhost:8080/departments/all').then(function(response2){
      $scope.departments=response2.data;

    })
  })

  $scope.dajNacinPrijave=function(id){
    if(id==1) return "Telefon";
    else if(id==2) return "E-mail";
    else return "Web aplikacija"
  }

  $scope.povratakNaZahtjeve=function(){
    $location.path("reqm");
  }
})
