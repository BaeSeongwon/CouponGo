(function(){
  'user strict';

  angular.module('app')
         .controller('loginCtrl',loginCtrl);

  loginCtrl.$inject = ['loginService'];

  function loginCtrl(){
    var login = this;
    login.moveMain = moveMain;
    login.beLogin = beLogin;

    function moveMain(){
      window.location.href = "http://ec2-52-78-41-172.ap-northeast-2.compute.amazonaws.com/#!";
    }

    function beLogin(){
      var loginInfo = loginService.login(login.id,login.pw);
    }
  }
})();
