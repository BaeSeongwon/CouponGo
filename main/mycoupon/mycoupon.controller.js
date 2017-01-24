(function(){
  'use strict';

  angular.module('app')
         .controller('mycouponCtrl',mycouponCtrl);

  mycouponCtrl.$inject = ['couponService','$timeout'];

  function mycouponCtrl(couponService,$timeout){
    var myCoupon = this;
    myCoupon.moveMain = moveMain;
    myCoupon.getMyCoupon = getMyCoupon;

    myCoupon.getMyCoupon();

    function moveMain(){
      window.location.href = "http://ec2-52-78-41-172.ap-northeast-2.compute.amazonaws.com/";
    }

    function getMyCoupon(){
      myCoupon.data = couponService.getMyCoupon();
      console.log(couponService.getMyCoupon());
      $timeout(function(){

      },1000,true);

    }
  }
})()
