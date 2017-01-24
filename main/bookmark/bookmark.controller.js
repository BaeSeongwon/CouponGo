(function(){
  'use strict';

  angular.module('app')
         .controller('bookmarkCtrl',bookmarkCtrl);

  function bookmarkCtrl(){
    var bookmark = this;
    bookmark.moveMain = moveMain;

    function moveMain(){
      window.location.href = "http://ec2-52-78-41-172.ap-northeast-2.compute.amazonaws.com/";
    }
  }
})();
