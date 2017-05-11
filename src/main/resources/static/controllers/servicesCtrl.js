/*
app.controller("servicesCtrl",function($rootScope,$scope,$log,$http,$location){

  $scope.services=[];
  $http.get("http://localhost:8080/services").then(function(response){
    $scope.services=response.data._embedded.services;
  })

  $scope.showService=function(id){
    $log.log("id je "+id);
    $location.path("/services/"+id);
  }
})
*/
/**
 * Created by Admira on 07-May-17.
 */
app.controller('servicesCtrl', function ($rootScope, $log, $location, $scope, $http, $route) {


    $scope.onInit = function () {
        $scope.prikaziDodaj = 0;
        $scope.usluga = {};

        if (localStorage.hasOwnProperty("username")) {
            $rootScope.username = localStorage.getItem("username");
            $scope.user = {};
            $http.get('/user/find?username=' + $rootScope.username).then(function (response) {

                $scope.user = response.data;
                $http.get('/incidents/services').then(function (response1) {
                    $scope.services = response1.data;
                });
            });

        }

        else {
            $rootScope.username = null;
        }

        $scope.addMode = function () {
            $scope.prikaziDodaj = 1;
        }

        $scope.dodajUslugu = function () {

            $http({
                    method: 'POST',
                    url: '/services',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: angular.toJson($scope.usluga)
                }
            ).then(function (response) {

                $http.get('/incidents/services').then(function (response1) {

                    $scope.services = response1.data;

                });
            })
        }
        $scope.uslugaNedostupna = function (service) {

            $http({
                    method: 'PATCH',
                    url: '/services/' + service.id,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: angular.toJson({available: false})
                }
            ).then(function (response) {

                $http.get('/incidents/services').then(function (response1) {

                        $scope.services = response1.data;
                    }
                )
            })
        };
        $scope.uslugaDostupna = function (service) {

            $http({
                    method: 'PATCH',
                    url: '/services/' + service.id,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: angular.toJson({available: true})
                }
            ).then(function (response) {

                $http.get('/incidents/services').then(function (response1) {

                        $scope.services = response1.data;
                    }
                );
            });
        }

        $scope.prijaviUslugu = function (service) {

            var nova = {
                "user": "http://localhost:8080/users/" + $scope.user.id,
                "service": "http://localhost:8080/services/" + service.id
            };

            $http({
                    method: 'POST',
                    url: '/userservices',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: angular.toJson(nova)
                }
            ).then(function (response) {

            })
        }


    }
});
