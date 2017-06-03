app.controller('showRequestCtrl',function($scope,$http,$location,$log,$routeParams,$q){
  $scope.request={};
  $scope.urgency=["Velika","Srednja","Mala"];
  $scope.influence=["Veliki","Srednji","Mali"];
  $scope.departments=[];
  $scope.priorities = [0,1,2,3,4,5];

  var changed=false;

  $http.get('http://localhost:8080/requests/getbyid/'+$routeParams.id).then(function(response){
    $scope.request=response.data;
    $http.get('http://localhost:8080/departments/all').then(function(response2){
      $scope.departments=response2.data;
      $scope.findInDepartments();
    })
  })

  $scope.sacuvajIzmjene=function(){
    if(!changed) $location.path("/reqm");
    else {
      $http.post('http://localhost:8080/requests/partialupdate/'+$routeParams.id,$scope.request).then(function(){
        $location.path("/reqm");
      },function(){
        $location.path("/reqm");
      }
      )
    }
  }

  $scope.change=function(){
    $log.log("promjena");
    changed=true;
  }
  $scope.pretvoriUIncident=function(){
    $http.get('http://localhost:8080/requests/convert/'+$routeParams.id).then(function(response){
      $location.path("/reqm");
    })
  }

  $scope.odustani=function(){
    $location.path("/reqm");
  }

  $scope.findInDepartments=function(){
  	for(i=0;i<$scope.departments.length;i++){
  		if($scope.departments[i].id==$scope.request.department.id){
  			$scope.request.department=$scope.departments[i];
  		}
  	}
  }

  $scope.odbijZahtjev=function() {
    $http.get('http://localhost:8080/requests/reject/'+$routeParams.id).then(function(response){
      $location.path("/reqm");
    })
  }

  $scope.dajNacinPrijave=function(id){
    if(id==1) return "Telefon";
    else if(id==2) return "E-mail";
    else return "Web aplikacija"
  }

})
