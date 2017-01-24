(function(){
  'use strict';

  angular.module('app')
         .service('loginService',loginService);

  loginService.$inject = ['$http'];

  function loginService($http){
    var service = {
      login:login,
      getLoginInfo:getLoginInfo,
      setLoginInfo:setLoginInfo
    }

    return service;

    var test = "머시여";

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

      });
    }
  }

  function getLoginInfo(){
    console.log(test);
    return this.LoginInfo.id;
  }

  function setLoginInfo(id){
    this.LoginInfo.id = id;
  }
})();
