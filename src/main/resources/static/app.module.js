var app = angular.module('PPISDzala',['ngRoute','chart.js']);

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
