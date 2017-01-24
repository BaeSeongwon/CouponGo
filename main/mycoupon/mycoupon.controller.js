(function(){
  'use strict';

  angular.module('app')
         .controller('mycouponCtrl',mycouponCtrl);

  mycouponCtrl.$inject = ['couponService','$http'];

  function mycouponCtrl(couponService,$http){
    var myCoupon = this;
    myCoupon.moveMain = moveMain;
    myCoupon.getMyCoupon = getMyCoupon;

    myCoupon.getMyCoupon();

    function moveMain(){
      window.location.href = "http://ec2-52-78-41-172.ap-northeast-2.compute.amazonaws.com/";
    }

    function getMyCoupon(){
      var info = {
        method: 'post',
        url: '/my_coupon',
        data: "",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      };

      $http(info).then(function(data){
        myCoupon.data = data.data;
        console.log(myCoupon.data);
      });
    }
  }
})()
