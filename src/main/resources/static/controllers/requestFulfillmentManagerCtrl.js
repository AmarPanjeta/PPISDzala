app.controller('requestFulfillmentManagerCtrl',function($scope,$http,$location,$rootScope,$route,$location,$log){
  $scope.user={};
  $scope.requests=[];

  $scope.labels = ["Aktivni incidenti", "Zatvoreni incidenti"];

  $scope.options={responsive: false,
          maintainAspectRatio: false}

  $scope.options2={responsive: false,
            maintainAspectRatio: true}


  $scope.labelsBAR = ['2011', '2012', '2013', '2014', '2015', '2016', '2017'];
  $scope.series = ['Rijeseni', 'Nerijeseni'];

  $scope.dataBAR = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

  $scope.loggedIn = function() {
      return $rootScope.username !== null;
  }

  if($rootScope.username!=null){
    $log.log($rootScope.username);
    $log.log($scope.aktuelniKlik);
    $http.get("http://localhost:8080/users/search/findByUsername?username="+$rootScope.username).then(function(response){
      $scope.user=response.data;
    })
  }

})
