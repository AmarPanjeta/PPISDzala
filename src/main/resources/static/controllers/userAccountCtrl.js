/**
 * Created by Admira on 07-May-17.
 */
app.controller('userAccountCtrl', function ($rootScope, $log, $location, $scope, $http, $route) {


    $scope.onInit = function () {
        $scope.izmijeniPodatke = 0;

        if (localStorage.hasOwnProperty("username")) {
            $rootScope.username = localStorage.getItem("username");
            $scope.user = {};
            $http.get('/user/find?username=' + $rootScope.username).then(function (response) {
                $scope.user = response.data;
                  $http.get('/user/userservices?userid=' + $scope.user.id).then(function (response1) {
                      $scope.services = response1.data;
                      if($scope.user.type==1){
                        $http.get('/incidents/userIncident?userid=' + $scope.user.id).then(function (response2) {
                            $scope.incidents = response2.data;
                            $http.get('/requests/userRequest?userid=' + $scope.user.id).then(function (response3) {
                                $scope.requests = response3.data;
                                $log.log($scope.requests);
                            });
                        });
                      }
                      else{
                        $http.get('requests/all').then(function(response2){
                          $scope.requests=response2.data;
                          $http.get('incidents/all').then(function(response3){
                            $scope.incidents=response3.data;
                          })
                        });
                      }

                  });
                });

        }

        else {
            $rootScope.username = null;
        }

        $scope.editMode = function () {
            $scope.izmijeniPodatke = 1;
        }

        $scope.edit = function () {
            $http({
                    method: 'PATCH',
                    url: '/users/' + $scope.user.id,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: angular.toJson($scope.user)
                }
            ).then(function (response) {
                var id = $scope.user.id;
                $scope.user = response.data;
                $scope.user.id = id;
                $scope.izmijeniPodatke = 0;
            })
        }
        $scope.prijaviIncident = function (service) {
            $scope.trenutniService = service;
            $scope.incident = {};
            $scope.problem = 1;
            $scope.zahtjev = 0;
        }
        $scope.odustaniIncident=function(){
            $scope.problem=0;
            $scope.incident={};
            $scope.zahtjev=0;
        }

        $scope.dodajZahtjev = function () {
            $scope.request = {};
            $scope.problem = 0;
            $scope.zahtjev = 1;
        }
        $scope.odustaniZahtjev=function(){
          $scope.request={};
          $scope.zahtjev=0;
          $scope.problem=0;
        }
        $scope.prijaviIncidentUnos = function () {
            $scope.incident.contactMethod = ($scope.incident.contact_method=="email"? 1:2);
            $scope.incident.reportMethod = 1;

            $http({
                    method: 'POST',
                    url: '/incidents/service/' + $scope.trenutniService.id + "/" + $scope.user.id + "/addIncident",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: angular.toJson($scope.incident)
                }
            ).then(function (response) {
                $http.get('/incidents/userIncident?userid=' + $scope.user.id).then(function (response2) {
                    $scope.incidents = response2.data;
                });
                $scope.incident={};
                $scope.problem=0;
            })
        }


        $scope.prijaviZahtjevZaUslugom = function () {

            $scope.request.contactMethod = ($scope.request.contact_method=="email"? 1:2);
            $scope.request.reportMethod = 3;

            $http({
                    method: 'POST',
                    url: '/reportrequest',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: angular.toJson({userId:$scope.user.id,title:$scope.incident.title,description:$scope.incident.description,contactMethod:$scope.request.contactMethod})
                }
            ).then(function (response) {
                $http.get('/requests/userRequest?userid=' + $scope.user.id).then(function (response3) {
                    $scope.requests = response3.data;
                });
                $scope.request={};
            })
        }

        $scope.obrisi = function (inc) {
            $http({
                    method: 'DELETE',
                    url: '/incidents/' + inc.id + "/delete",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(function (response) {

                $scope.incidents.splice($scope.incidents.indexOf(inc), 1);

            })
        }
        /* Ovo bi trebao biti soft delete, kako bi mogli lakse mogli koristiti podatke za analizu */
        $scope.obrisiZahtjev = function (req) {

            $http({
                    method: 'DELETE',
                    url: '/requests/' + req.id + "/delete",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(function (response) {

                $scope.requests.splice($scope.requests.indexOf(req), 1);

            })
        }

        $scope.odjaviUslugu = function (service) {

            $http({
                    method: 'GET',
                    url: '/user/userservicesuserservice?userid=' + $scope.user.id + '&serviceid=' + service.id,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(function (response) {

                $scope.services.splice($scope.services.indexOf(service), 1);

            })
        }
    }
});
