(function(){
  'use strict';

  angular.module('app')
         .service('loginService',loginService);

  loginService.$inject = ['$http'];

  function loginService($http){
    var service = {
      login:login,
      getLoginInfo:getLoginInfo
    }

    return service;

    var getLoginInfo = {
      id: ''
    };

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
      $http(info).then(function(data){
        service.getLoginInfo = data.data;
        console.log(service.getLoginInfo);
      });
    }
  }
})();
