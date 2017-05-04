var app = angular.module('PPISDzala',['ngRoute']);

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);