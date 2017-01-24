(function(){
  'user strict';

  angular.module('app')
         .controller('loginCtrl',loginCtrl);

  function loginCtrl(){
    var login = this;
    login.moveMain = moveMain;

    function moveMain(){
      window.location.href = "http://ec2-52-78-41-172.ap-northeast-2.compute.amazonaws.com/#!";
    }
  }
})();
