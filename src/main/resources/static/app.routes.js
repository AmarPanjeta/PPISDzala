app.config(function($routeProvider){
  $routeProvider.when('/login',{
    templateUrl:"partials/loginPage.html",
    controller:"loginCtrl"
  }).when('/registration',{
    templateUrl:"partials/registrationPage.html",
    controller:"registrationCtrl"
  }).when('/useraccount',{
      templateUrl:"partials/userAccountPage.html",
      controller:"userAccountCtrl"
  })      .when('/services',{
          templateUrl:"partials/servicesPage.html",
          controller:"servicesCtrl"
      }).when("/",{
    templateUrl:"partials/homePage.html"
  }).otherwise("/")
});
