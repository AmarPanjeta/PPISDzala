app.controller('managerAddRequestCtrl',function($http,$log,$rootScope,$scope,$route,$location){

$scope.user={};
$scope.request={};
$scope.urgency=["Velika","Srednja","Mala"];
$scope.influence=["Veliki","Srednji","Mali"];
$scope.requestUrgency="";
$scope.requestInfluence="";
$scope.departments=[];
$scope.requestId={};
$scope.services={};


if($rootScope.username!=null){
	$log.log($rootScope.username);
	$http.get("http://localhost:8080/users/search/findByUsername?username="+$rootScope.username).then(function(response){
		$scope.request.user=response.data;
	})
	$http.get("http://localhost:8080/departments/all").then(function(response){
		$scope.departments=response.data;
	})
}

$scope.ispuni=function(username){
$http.get("http://localhost:8080/users/search/findByUsername?username="+username).then(function(response){
	$scope.user=response.data;
	$scope.request.user=response.data;
	})
}

$scope.evidentirajZahtjev=function(){
	$log.log($rootScope.username);

	if($scope.requestUrgency=="Velika" && $scope.requestInfluence=="Veliki"){
		$scope.request.priority=1;
	} else if($scope.requestUrgency=="Velika" && $scope.requestInfluence=="Srednji"){
		$scope.request.priority=2;
	} else if($scope.requestUrgency=="Velika" && $scope.requestInfluence=="Mali"){
		$scope.request.priority=3;
	} else if($scope.requestUrgency=="Srednja" && $scope.requestInfluence=="Veliki"){
		$scope.request.priority=2;
	} else if($scope.requestUrgency=="Srednja" && $scope.requestInfluence=="Srednji"){
		$scope.request.priority=3;
	} else if($scope.requestUrgency=="Srednja" && $scope.requestInfluence=="Mali"){
		$scope.request.priority=4;
	} else if($scope.requestUrgency=="Mala" && $scope.requestInfluence=="Veliki"){
		$scope.request.priority=3;
	} else if($scope.requestUrgency=="Mala" && $scope.requestInfluence=="Srednji"){
		$scope.request.priority=4;
	} else if($scope.requestUrgency=="Mala" && $scope.requestInfluence=="Mali"){
		$scope.request.priority=5;
	} else{
		$scope.request.priority=5;
	}
	$log.log("priority:",$scope.request.priority);
	// Komentar - ovo trenutno stoji zbog toga sto nismo sigurni na sta se odnosi i da li je za zahtjeve potrebna hitnost
	$scope.request.urgency=0;
	$http.post("http://localhost:8080/requests/add",$scope.request).then(function(response3){
		$log.log("uspjesno dodan zahtjev");
		$log.log($scope.request);
		$location.path("/reqm");
	});
}

$scope.odustani=function(){

	$location.path("/reqm");

/*
	html2canvas(document.body, {
	onrendered: function(canvas) {
		document.body.appendChild(canvas);
	}
});*/
/*
var objekat=document.getElementsByClassName('info')[0];
var pdf = new jsPDF('p', 'pt', 'letter');
    var canvas = pdf.canvas;
		canvas.height = 72 * 11;
		canvas.width= 72 * 8.5;
    html2canvas(document.body, {
        canvas:canvas,
        onrendered: function(canvas) {

            var iframe = document.createElement('iframe');
            iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');
            document.body.appendChild(iframe);
            iframe.src = pdf.output('datauristring');
						pdf.save("proba.pdf");
           //var div = document.createElement('pre');
           //div.innerText=pdf.output();
           //document.body.appendChild(div);
        }
    });*/
}

})
