app.controller('requestFulfillmentManagerCtrl',function($scope,$http,$location,$rootScope,$route,$location,$log){
  $scope.user={};
  $scope.requests=[];
  $scope.aktuelniKlik=0;
	$scope.zatvoreniKlik=0;
	$scope.statistikaKlik=0;

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
    $log.log($scope.iKlik);
    $http.get("http://localhost:8080/users/search/findByUsername?username="+$rootScope.username).then(function(response){
      $scope.user=response.data;
    })
  }

  $scope.detaljnoZahtjev=function(id){
    $location.path("/requests/"+id);
  }

  $scope.generisiIzvjestaj=function(){
    stats={};

    $http.get("http://localhost:8080/incidents/stats").then(function(response){
      stats=response.data;
      var doc = new jsPDF()

      doc.text('Izvjestaj', 10, 10)

      doc.text('Broj incidenata:'+stats.number,10,22);

      doc.text('Broj rijesenih:'+stats.fixed,10,32);

      doc.text('Broj otvorenih:'+stats.open,10,42);

      doc.text('Broj pogresnih prijava:'+stats.falseIncidents,10,52);

      doc.save('izvjestaj.pdf')
    })

  }

  $scope.prikaziStatistiku=function(){
    $scope.statistikaKlik=1;
    $scope.aktuelniKlik=0;
    $scope.zatvoreniKlik=0;

    niz=[];

    $http.get("http://localhost:8080/incidents/search/countIncidents").then(function(response){
      $scope.allInc=response.data;
    })
    $http.get("http://localhost:8080/incidents/search/countActiveIncidents").then(function(response1){
      $scope.activeInc=response1.data;
      niz.push(response1.data);

      $http.get("http://localhost:8080/incidents/search/countClosedIncidents").then(function(response2){
        $scope.closedInc=response2.data;
        niz.push($scope.closedInc);
        $scope.data=niz;

        var pdf = new jsPDF('p', 'pt', 'letter');
var canvas = pdf.canvas;
canvas.height = 72 * 11;
canvas.width=72 * 8.5;;
// var width = 400;
html2canvas("<h1>to je to</h1>", {
        canvas:canvas,
        onrendered: function(canvas) {
            var iframe = document.createElement('iframe');
            iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');
            document.body.appendChild(iframe);
            iframe.src = pdf.output('datauristring');
           //var div = document.createElement('pre');
           //div.innerText=pdf.output();
           //document.body.appendChild(div);
        }
    });

      })
    })
  }

  $scope.prikaziAktuelne=function(){
    $http.get("http://localhost:8080/requests/active").then(function(response){
      $scope.aktuelniKlik=1;
      $scope.statistikaKlik=0;
      $scope.zatvoreniKlik=0;
      $scope.requests=response.data;
      for(i=0;i<$scope.requests.length;i++){
        timestamp=$scope.requests[i].created;
        var date = new Date(timestamp);

        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        var hours = date.getUTCHours();
        var minutes = date.getUTCMinutes();
        var seconds = date.getUTCSeconds();
        $scope.requests[i].datumPrijave={year,month,day,hours,minutes,seconds};
      }

    })
  }

  $scope.prikaziZatvorene=function(){
    $http.get("http://localhost:8080/requests/closed").then(function(response){
      $scope.aktuelniKlik=0;
      $scope.statistikaKlik=0;
      $scope.zatvoreniKlik=1;
      $scope.requests=response.data;
      for(i=0;i<$scope.requests.length;i++){
        timestamp=$scope.requests[i].created;
        var date = new Date(timestamp);

        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        var hours = date.getUTCHours();
        var minutes = date.getUTCMinutes();
        var seconds = date.getUTCSeconds();
        $scope.requests[i].datumPrijave={year,month,day,hours,minutes,seconds};
      }

    })
  }

  $scope.sakrijAktuelne=function(){
    $scope.aktuelniKlik=0;
  }

  $scope.sakrijStatistiku=function(){
    $scope.statistikaKlik=0;
  }

  $scope.sakrijZatvorene=function(){
    $scope.zatvoreniKlik=0;
  }

  $scope.evidentirajZahtjev=function(){
    $log.log("to je to!");
    $location.path("/manageraddrequest");
  }
})
