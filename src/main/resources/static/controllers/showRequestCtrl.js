app.controller('showRequestCtrl',function($scope,$http,$location,$log,$routeParams){
<<<<<<< HEAD
  $scope.request={}
  $scope.urgency=["Velika","Srednja","Mala"];
  $scope.influence=["Veliki","Srednji","Mali"];

  $http.get('http://localhost:8080/requests/getbyid/'+$routeParams.id).then(function(response){
    $scope.request=response.data;
  })

=======
  $scope.request={};
  $scope.urgency=["Velika","Srednja","Mala"];
  $scope.influence=["Veliki","Srednji","Mali"];
  $scope.departments=[];

  $http.get('http://localhost:8080/requests/getbyid/'+$routeParams.id).then(function(response){
    $scope.request=response.data;
    $http.get('http://localhost:8080/departments/all').then(function(response2){
      $scope.departments=response2.data;
    })
  })

  $scope.pretvoriUIncident=function(){
    $http.get('http://localhost:8080/requests/convert/'+$routeParams.id).then(function(response){
      $location.path("/reqm");
    })
  }

  $scope.odustani=function(){
    $location.path("/reqm");
  }

  $scope.odbijZahtjev=function() {
    $http.get('http://localhost:8080/requests/reject/'+$routeParams.id).then(function(response){
      $location.path("/reqm");
    })
  }
>>>>>>> 76435d15846dd8078e3fd2847b2b0912d46c972a
  $scope.dajNacinPrijave=function(id){
    if(id==1) return "Telefon";
    else if(id==2) return "E-mail";
    else return "Web aplikacija"
  }
})
