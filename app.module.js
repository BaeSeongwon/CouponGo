(function(){
  'use strict';

  angular.module('app',['ngRoute'])
         .config(config);

  function config($routeProvider){
    $routeProvider
    .when('/',{
      templateUrl: 'main/geolocation/geolocation.template.html',
      controller: 'mainCtrl',
      controllerAs: 'main'
    })
    .when('/login',{
       templateUrl: 'main/login/login.template.html',
       controller: 'loginCtrl',
       controllerAs: 'login'
    })
    .when('/bookmark',{
      templateUrl: 'main/bookmark/bookmark.template.html',
      controller: 'bookmarkCtrl',
      controllerAs: 'bookmark'
    })
  }
})();
