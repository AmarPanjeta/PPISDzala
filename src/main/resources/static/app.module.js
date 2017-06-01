var app = angular.module('PPISDzala',['ngRoute','chart.js', 'angularCSS']);

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
