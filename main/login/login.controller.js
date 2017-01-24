(function(){
  'user strict';

  angular.module('app')
         .controller('loginCtrl',loginCtrl);

  function loginCtrl(){
    var login = this;
    login.moveMain = moveMain;

    function moveMain(){
      window.location.href = "http://localhost/#!";
    }
  }
})();
