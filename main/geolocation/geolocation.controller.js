(function(){
  'use strict';

  angular
    .module('app')
    .controller('mainCtrl',mainCtrl);

  mainCtrl.$inject = ['loginService','$cookies','couponService'];

  function mainCtrl(loginService,$cookies,couponService){

    // 변수 선언부
    var main = this;
    var map;
    var ps; // 장소 검색 객체
    var kk; // 위도
    main.sideCheck = false;
    main.setLocation = setLocation;
    main.category = false;
    main.moveLogin = moveLogin;
    main.moveBookmark = moveBookmark;
    main.loginInfo = loginService.getLoginInfo;
    main.getId = getId;
    main.getCoupon = getCoupon;

    $("#getCoupon").click(function(){
      console.log("sss");
      couponService.getCoupon();
    })

    // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
    var placeOverlay = new daum.maps.CustomOverlay({zIndex:1});

    // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
    var contentNode = document.createElement('div');

    // 지도에 idle 이벤트를 등록합니다
    // daum.maps.event.addListener(map, 'idle', searchPlaces);

    // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
    contentNode.className = 'placeinfo_wrap';

    // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
    // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 daum.maps.event.preventMap 메소드를 등록합니다
    addEventHandle(contentNode, 'mousedown', daum.maps.event.preventMap);
    addEventHandle(contentNode, 'touchstart', daum.maps.event.preventMap);

    // 커스텀 오버레이 컨텐츠를 설정합니다
    placeOverlay.setContent(contentNode);

    // 마커를 담을 배열입니다
    var markers = [];

    // 현재 선택된 카테고리를 가지고 있을 변수입니다
    var currCategory = '';

    //함수 호출부
    addCategoryClickEvent();
    //getGeolocation();
    main.getId();

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
      ps = new daum.maps.services.Places(map); //검색 객체 할당

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

    // 각 카테고리에 클릭 이벤트를 등록합니다
    function addCategoryClickEvent() {
      var category = document.getElementById('category');
      var children = category.children;
      for (var i=0; i<children.length; i++) {
        children[i].onclick = onClickCategory;
      }
    }

    // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
    function addEventHandle(target, type, callback) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent('on' + type, callback);
      }
    }

    // 카테고리를 클릭했을 때 호출되는 함수입니다
    function onClickCategory() {
      var id = this.id;
      var className = this.className;
      placeOverlay.setMap(null);
      if (className === 'on') {
        currCategory = '';
        changeCategoryClass();
        removeMarker();
      } else {
        currCategory = id;
        changeCategoryClass(this);
        searchPlaces();
      }
    }

    // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
    function changeCategoryClass(el) {
      var category = document.getElementById('category');
      var children = category.children;
      var i;
      for ( i=0; i<children.length; i++ ) {
        children[i].className = '';
      }
      if (el) {
        el.className = 'on';
      }
    }

    // 카테고리 검색을 요청하는 함수입니다
    function searchPlaces() {
      if (!currCategory) {
        return;
      }
      // 커스텀 오버레이를 숨깁니다
      placeOverlay.setMap(null);
      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();
      ps.categorySearch(currCategory, placesSearchCB, {useMapBounds:true});
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB( status, data, pagination ) {
      if (status === daum.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        displayPlaces(data.places);
      } else if (status === daum.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === daum.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    }

    // 지도에 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      var order = document.getElementById(currCategory).getAttribute('data-order');
      for ( var i=0; i<places.length; i++ ) {
        var a = "세븐일레븐";
        var str =places[i].title;
        var result = str.indexOf(a);
        if(result!=-1)
        {
          kk=places[i].latitude;
        }
        // 마커를 생성하고 지도에 표시합니다
        var marker = addMarker(new daum.maps.LatLng(places[i].latitude, places[i].longitude), order,kk);
        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        (function(marker, place) {
          daum.maps.event.addListener(marker, 'click', function() {
            displayPlaceInfo(place);
          });
        })(marker, places[i]);
      }
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, order ,kk) {
      if(position.hb==kk){
        var first = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png';
      }
      else {
        var first='https://cdn0.iconfinder.com/data/icons/entypo/98/small28-32.png';
      }
      var imageSrc =first , // 마커 이미지 url, 스프라이트 이미지를 씁니다
              imageSize = new daum.maps.Size(27, 28),  // 마커 이미지의 크기
              imgOptions =  {
                spriteSize : new daum.maps.Size(72, 208), // 스프라이트 이미지의 크기
                spriteOrigin : new daum.maps.Point(10, (order*36)), // 스프에서라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new daum.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내의 좌표
              },
              markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imgOptions),
              marker = new daum.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage
              });
      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker);  // 배열에 생성된 마커를 추가합니다
      return marker;
    }

    // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
    function displayPlaceInfo (place) {
      var content = '<div class="placeinfo">' +
                      '<a class="title" href="'+place.placeUrl+'"target="_blank" title="'+place.title+'">'+place.title+'</a>';
      if(place.newAddress){
        content += '<span title="'+place.newAddress+'">'+place.newAddress+'</span>'+
                   '<span class="jibun" title="' + place.address + '">(지번 : ' + place.address + ')</span>';
      }else{
        content += '<span title="'+place.address+'">'+place.address+'</span>';
      }
      content += '<span class="tel">'+place.phone+'</span> <button type="button" onclick="getCoupon(25)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">쿠폰 발급</button> '+'</div>'
                +'<div class="after"></div>';
      contentNode.innerHTML = content;
      placeOverlay.setPosition(new daum.maps.LatLng(place.latitude, place.longitude));
      placeOverlay.setMap(map);
    }

    function moveLogin(){
      window.location.href = "http://ec2-52-78-41-172.ap-northeast-2.compute.amazonaws.com/#!/login";
    }

    function moveBookmark(){
      window.location.href = "http://ec2-52-78-41-172.ap-northeast-2.compute.amazonaws.com/#!/bookmark"
    }

    function getId(){
      main.loginInfo = $cookies.get('id');
      console.log($cookies);
    }

    function getCoupon(title){
      console.log("??");
      var data = couponService.getCoupon(title);
      console.log(couponService.getCoupon(title));
    }
  }
})();

$(document).ready(function(){
  function getCoupon(title){
    console.log("??");
  }
})
