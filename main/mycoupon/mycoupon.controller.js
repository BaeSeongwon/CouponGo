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

$(document).ready(function(){
  Kakao.init('289320d14cc1a2285261e420d371c6e7');
  Kakao.Link.createTalkLinkButton({
    container: '#kakao-link-btn',
    label: '카카오링크 샘플에 오신 것을 환영합니다.',
    image: {
      src: 'http://dn.api1.kage.kakao.co.kr/14/dn/btqaWmFftyx/tBbQPH764Maw2R6IBhXd6K/o.jpg',
      width: '300',
      height: '200'
    },
    webButton: {
      text: '카카오 디벨로퍼스',
      url: 'http://http://ec2-52-78-41-172.ap-northeast-2.compute.amazonaws.com/'
    }
  });
})
