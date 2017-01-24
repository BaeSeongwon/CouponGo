(function(){
  'use strict';

  angular.module('app')
         .serivce('loginService'loginService);

  loginService.$inject = ['$http'];

  function loginService($http){
    var service = {
      login:login
    }

    return service;

    function login(id,pw){
      var info = {
        method: 'post',
        url: '/Login',
        data: $.param({
          id: id,
          password: pw
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      };
      $.http(info).success(function(data){
          console.log(data);
          return data;
      })
    }
  }
})();
