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
                    $http.get('/incidents/userIncident?userid=' + $scope.user.id).then(function (response2) {
                        $scope.incidents = response2.data;
                        $http.get('/requests/userRequest?userid=' + $scope.user.id).then(function (response3) {
                            $scope.requests = response3.data;
                        });
                    });
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

        $scope.dodajZahtjev = function () {
            $scope.request = {};
            $scope.problem = 0;
            $scope.zahtjev = 1;
        }
        $scope.prijaviIncidentUnos = function () {
            $scope.incident.contactMethod = 1;
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
            })
        }


        $scope.prijaviZahtjevZaUslugom = function () {

            $scope.request.contactMethod = 1;
            $scope.request.reportMethod = 1;

            $http({
                    method: 'POST',
                    url: '/requests/' + $scope.user.id + "/addRequest",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: angular.toJson($scope.request)
                }
            ).then(function (response) {
                $http.get('/requests/userRequest?userid=' + $scope.user.id).then(function (response3) {
                    $scope.requests = response3.data;
                });
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
