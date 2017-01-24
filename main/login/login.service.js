(function(){
  'use strict';

  angular.module('app')
         .service('loginService',loginService);

  loginService.$inject = ['$http'];

  function loginService($http){
    var LoginInfo = {
      id: null
    }
    
    var service = {
      login:login,
      getLoginInfo:getLoginInfo,
      setLoginInfo:setLoginInfo
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
      $http(info).then(function(data){
          setLoginInfo(data.data);
      });
    }
  }

  function getLoginInfo(){
    return LoginInfo.id;
  }

  function setLoginInfo(id){
    LoginInfo.id = id;
  }
})();
