app.controller('incidentCtrl',function($http,$log,$rootScope,$scope,$route,$location){

$scope.user={};
$scope.incident={};


$scope.prijaviIncident=function(){
	$log.log($rootScope.username);
}

$scope.odustani=function(){
	$location.path("/incidentmanager");
}

})