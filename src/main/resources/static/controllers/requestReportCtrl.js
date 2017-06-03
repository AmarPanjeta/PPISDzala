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

			/*
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

			doc.save('izvjestaj.pdf')*/

			var doc = new jsPDF();



			var img = new Image();





					 // doc.line(100,100,100,100);
			doc.setLineWidth(0.5);
			doc.line(50, 35, 200, 35);
			doc.setFontSize(15);
			doc.setFont("times");
			doc.setFontType("bolditalic");
			doc.text(80,33,"Izvještaj kompanije DžAALA Telecom");


			doc.setFontSize(22);
			doc.setFont("times");
			doc.setFontType("bolditalic");
			doc.text(80,83,"Izvještaj o zahtjevima za uslugom");

			doc.setFontSize(14);
			doc.setFont("times");
			doc.setFontType("normalitalic");

			doc.text(10,113,"U skladu sa pravilnikom poslovanja preduzeca DžAALA Telecom prema clanu 10. Ugovora ");
			doc.text(10,123,"o saradnji sa fizickim i pravnim licima, tacnost podataka navedenih u ovom dokumentu");
			doc.text(10,133,"garantuje DžAALA Telecom te se kao takvi smiju koristiti u svrhu donošenja odluka");
			doc.text(10,143,"za pobosljanje i unaprijedjenje ovog poslovnog procesa");

			doc.setFontSize(18);
			doc.setFont("times");
			doc.setFontType("bolditalic");

			if($scope.month!=0){
				doc.text('Izvještaj za period: '+$scope.month+'/'+$scope.year+'.godine',80,163);
			}
			else{
				doc.text('Izvještaj za godinu: '+$scope.year+'.',80,163);
			}


			doc.setFontSize(15);
			doc.setFont("times");
			doc.setFontType("normal");

			doc.text('Broj rijesenih zahtjeva za uslugom:'+$scope.Statistika.closed,10,183);

			doc.text('Broj otvorenih zahtjeva za uslugom:'+$scope.Statistika.active,10,193);

			doc.text('Broj pogresno prijavljenih zahtjeva za uslugom:'+$scope.Statistika.active,10,203);

			doc.text('Prosjecno vrijeme rjesavanja incidenata:'+$scope.Statistika.active,10,213);

			doc.text('------------------------------------------------------------------------------------------------------------',10,220);

			doc.text('Ukupan broj zahtjeva za uslugom:'+$scope.Statistika.all,10,233);

			//doc.text('Broj pogresnih prijava:'+stats.falseIncidents,10,52)


			img.onload = function() {
					doc.addImage(this, 10, 10,50,50);
					doc.save('izvjestaj.pdf');

			};
			img.crossOrigin = "";
			img.src = '/picture/logoone.png';


			/*

				if($scope.month!=0){
				doc.text('Izvjestaj za period: '+$scope.month+'/'+$scope.year+'.godine',10,32);
			}else{
				doc.text('Izvjestaj za godinu: '+$scope.year+'.',10,32);
			}

			doc.text('',10,42);



			doc.text('Broj rijesenih incidenata:'+$scope.Statistika.closed,10,52);

			doc.text('Broj otvorenih incidenata:'+$scope.Statistika.active,10,62);

			doc.text('-------------------------------------------------------------',10,72);

			doc.text('Ukupan broj incidenata:'+$scope.Statistika.all,10,82);

			//doc.text('Broj pogresnih prijava:'+stats.falseIncidents,10,52);*/


	}

})
