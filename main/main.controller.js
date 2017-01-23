(function(){
  'use strict';

  angular
    .module('app')
    .controller('mainCtrl',mainCtrl);

  mainCtrl.$inject = [];

  function mainCtrl(){
    // 변수 선언부
    var main = this;
    var map;
    main.sideCheck = false;
    main.setLocation = setLocation;

    //함수 호출부
    //getGeolocation();

    drawDaumMap(35.160235,129.1666219);

    function getGeolocation(){
      if('geolocation' in navigator){
        // 네비게이션 사용가능

        //현재 위치 가져오는 함수
        navigator.geolocation.getCurrentPosition(function(position) {
          //position.coords.latitude -> 위도
          //position.coords.longitude -> 경도

        });

      }else{
        // 네비게이션 사용불가
        alert("사용불가");
      }
    }

    function drawDaumMap(latitude,longitude){
      // 다음 지도 생성
      var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(latitude, longitude), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };

      map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

      // 마커가 표시될 위치입니다
      var markerPosition  = new daum.maps.LatLng(latitude,longitude);

      // 마커를 생성합니다
      var marker = new daum.maps.Marker({
          position: markerPosition
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    }

    function setLocation(lat,long){
      // 이동할 위도 경도 위치를 생성합니다
     var moveLatLon = new daum.maps.LatLng(lat,long);

     // 지도 중심을 이동 시킵니다
     map.setCenter(moveLatLon);
    }
  }
})()
