app.controller('requestReportCtrl',function($http,$log,$rootScope,$scope,$route,$location){

$scope.connection=0;
$scope.mjesecni=false;
$scope.godisnji=false;
$scope.mjeseci=[1,2,3,4,5,6,7,8,9,10,11,12];
$scope.godine=[2015,2016,2017];
$scope.month=0;
$scope.year=0;
$scope.Statistika={};
$scope.prikazi=0;




$scope.kreirajIzvjestaj=function(){

	if($scope.month!=0 && $scope.year!=0){
		$http.get("http://localhost:8080/requests/monthlystatistics?year="+$scope.year+"&month="+$scope.month).then(function(response){
			$scope.Statistika=response.data;
		})
	}else if($scope.month==0 && $scope.year!=0){
		$http.get("http://localhost:8080/requests/yearlystatistics?year="+$scope.year).then(function(response){
			$scope.Statistika=response.data;
		})
	}

	$scope.prikazi=1;

}

$scope.prikaziPolja=function(){
	$scope.prikazi=0;
	$scope.month=0;
	$scope.year=0;
}

	$scope.odustani=function(){
		$location.path("/reqm");
	}



	$scope.generisiIzvjestaj=function(){

			var doc = new jsPDF();

			doc.text('Izvjestaj', 10, 10)

			doc.text('Broj incidenata:'+$scope.Statistika.all,10,22);

			doc.text('Broj rijesenih:'+$scope.Statistika.closed,10,32);

			doc.text('Broj otvorenih:'+$scope.Statistika.active,10,42);

			//doc.text('Broj pogresnih prijava:'+stats.falseIncidents,10,52);

			if($scope.month!=0){
				doc.text('Izvjestaj za period: '+$scope.month+'.'+$scope.year+'.godine',10,52);
			}else{
				doc.text('Izvjestaj za godinu: '+$scope.year+'.',10,52);
			}

			doc.save('izvjestaj.pdf')


	}

})
