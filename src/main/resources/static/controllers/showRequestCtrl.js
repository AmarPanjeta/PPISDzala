app.controller('showRequestCtrl',function($scope,$http,$location,$log,$routeParams,$rootScope){
  $scope.request={};
  $scope.urgency=["Velika","Srednja","Mala"];
  $scope.influence=["Veliki","Srednji","Mali"];
  $scope.departments=[];
  $scope.priorities = [0,1,2,3,4,5];
  $scope.answerText="";
  $scope.imaOdgovora=false;
  $scope.answers=[]


  var changed=false;

  $http.get('http://localhost:8080/requests/getbyid/'+$routeParams.id).then(function(response){
    $scope.request=response.data;
    $http.get('http://localhost:8080/departments/all').then(function(response2){
      $scope.departments=response2.data;
      $scope.findInDepartments();
      $scope.vratiOdgovore();
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

  $scope.vratiOdgovore=function(){
  	$http.get("http://localhost:8080/requestanswer/getanswersbyrequest/"+$scope.request.id).then(function(response){
  		$scope.answers=response.data;
  		$log.log("odgovori",$scope.answers);
  		if($scope.answers.length>0){
  			$scope.imaOdgovora=true;
        for(i=0;i<$scope.answers.length;i++){
          timestamp=$scope.answers[i].created;
          var date = new Date(timestamp);

          var year = date.getUTCFullYear();
          var month = date.getUTCMonth() + 1;
          var day = date.getUTCDate();
          var hours = date.getUTCHours();
          var minutes = date.getUTCMinutes();
          var seconds = date.getUTCSeconds();
          $scope.answers[i].datumPrijave={year,month,day,hours,minutes,seconds};
        }
  		}
  	})
  }

  $scope.dodajOdgovor=function(){
    $http.post("http://localhost:8080/requestanswer/add",{text:$scope.answerText,requestId:$routeParams.id,autorId:$rootScope.id}).then(function(){
      $scope.vratiOdgovore();
      $scope.answerText="";
    })
  }

})
