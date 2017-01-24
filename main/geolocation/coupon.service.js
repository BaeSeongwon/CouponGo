(function(){
  'use strict';

  angular.module(app)
         .service('couponService',couponService);

  couponService.$inject = ['$http'];

  function couponService($http){
    var service = {
      getCoupon:getCoupon
    }

    return service;

    function getCoupon(title){
      var info = {
        method: 'post',
        url: '/send',
        data: $.param({
          data: title
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      };
      $http(info).then(function(data){
        return data;
      });
    }
  }
})();
