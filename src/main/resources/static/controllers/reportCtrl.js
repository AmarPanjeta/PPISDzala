app.controller('reportCtrl',function($http,$log,$rootScope,$scope,$route,$location){

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
		$http.get("http://localhost:8080/incidents/monthlystatistics?year="+$scope.year+"&month="+$scope.month).then(function(response){
			$scope.Statistika=response.data;
		})
	}else if($scope.month==0 && $scope.year!=0){
		$http.get("http://localhost:8080/incidents/yearlystatistics?year="+$scope.year).then(function(response){
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
		$location.path("/incidentmanager");
	}



	$scope.generisiIzvjestaj=function(){
	
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
			doc.text(80,83,"Izvještaj o incidentima");

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

			doc.text('Broj rijesenih incidenata:'+$scope.Statistika.closed,10,183);

			if($scope.month==0){

		    doc.text('Broj rijesenih incidenata po mjesecima: 0 | 1 | 2 | 3 | 7 | 0 | 0 | 0 | 0 | 0 | 0 |',20,193);
		    doc.text('Broj otvorenih incidenata:'+$scope.Statistika.active,10,203);

			}else{

			doc.text('Broj otvorenih incidenata:'+$scope.Statistika.active,10,193);
		}

			if($scope.month==0){

			doc.text('Broj otvorenih incidenata po mjesecima: 0 | 1 | 2 | 3 | 7 | 0 | 0 | 0 | 0 | 0 | 0 |',20,213);
			doc.text('Broj pogresno prijavljenih incidenata:'+$scope.Statistika.active,10,223);
			doc.text('Odnos otvoreni/zatvoreni incidenti:'+$scope.Statistika.active,10,233);
			doc.text('Broj rjesenih incidenata po glavi uposlenika odgovorih odjela: 3.2 inc/upos',10,243);
			doc.text('------------------------------------------------------------------------------------------------------------',10,250);

			doc.text('Ukupan broj incidenata:'+$scope.Statistika.all,10,260);
			}
else{
			doc.text('Broj pogresno prijavljenih incidenata:'+$scope.Statistika.active,10,203);

			doc.text('Odnos otvoreni/zatvoreni incidenti:'+$scope.Statistika.active,10,213);

			doc.text('Broj rjesenih incidenata po glavi uposlenika odgovornih odjela: 3.2 inc/upos',10,223);

			doc.text('------------------------------------------------------------------------------------------------------------',10,230);

			doc.text('Ukupan broj incidenata:'+$scope.Statistika.all,10,243);

			//doc.text('Broj pogresnih prijava:'+stats.falseIncidents,10,52)

}
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