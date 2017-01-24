(function(){
  'use strict';

  angular.module('app')
         .controller('mycouponCtrl',mycouponCtrl);

  mycouponCtrl.$inject = ['couponService'];

  function mycouponCtrl(couponService){
    var myCoupon = this;
    myCoupon.moveMain = moveMain;
    myCoupon.getMyCoupon = getMyCoupon;

    myCoupon.getMyCoupon();

    function moveMain(){
      window.location.href = "http://ec2-52-78-41-172.ap-northeast-2.compute.amazonaws.com/";
    }

    function getMyCoupon(){
      var data = couponService.getMyCoupon();
      myCoupon.datas = data;
      console.log(data);
    }
  }
})()
