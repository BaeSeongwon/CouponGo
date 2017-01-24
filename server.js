var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cookie = require('cookie-parser');
var session = require('express-session');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var connection = mysql.createConnection({
  host: 'hue.c4yiq5vuopvi.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  user: 'root',
  password: 'seongwon9179',
  database: 'CouponGo',
});

var app = express(app);
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret :'subin',
  resave :false,
  saveUninitialized: true
}));

http.createServer(app).listen(80,function(){
  connection.connect(function(err){
    if(err){
      console.log("실패 ㅠㅠ");
    }else{
      console.log("DB 실행 완료");
    }
  })
  console.log("서버 실행 포트는 3000!!");
});

app.get('/',function(req,res){
  res.sendFile('index.html');
});

app.post('/send' ,function (req,res,next) {

  console.log(req.body.data);

  var a = "세븐일레븐";
  var b="CU";
  var c="스타벅스";


  var str =req.body.data;

  if(str.indexOf(a)!=-1)
  {
    var data = {
      co_name:"세븐일레븐",
      co_date:"2017년1월31일",
      co_content:"오리온)초코칩쿠키1500원",
      co_image:"c:\User\Parksubin\Web"
    };
    res.send(data);
  }
  else if(str.indexOf(b)!=-1){
    var data = {
      co_name:"CU",
      co_date:"2017년1월31일",
      co_content:"맥심top아메리카노1100원",
      co_image:"c:\User\Parksubin\Web"
    };

    res.send(data);
  }

  else if (str.indexOf(c)!=-1){
    var data = {
      co_name:"스타벅스",
      co_date:"2017년1월31일",
      co_content:"패션티 레모네이드 피지오 5400원",
      co_image:"c:\User\Parksubin\Web"
    };

    res.send(data);
  }

  else {
    res.send("쿠폰이없음");
  }
});

//쿠폰데이터 삽입
app.post('/resend' ,function (req,res,next) {

  console.log(req.body);

  pool.getConnection(function (err,connection) {

    var data =[];
    var sql = "insert into Coupon(co_name,co_date,co_content,co_image) values(?)";

    connection.query(sql,[data],function (err, data) {

      if (err) console.error("err : " + err);

      console.log(data);

      key=data.insertId;

      var data2=[req.session.user_id,key];

      var sql2 = "insert into User_Coupon(id,coupon_id) values(?)";

      connection.query(sql2,[data2],function (err,data) {

      console.log(data);

        res.send("Coupon suc!");

        connection.release();
      });

    });
  });
});

app.post('/my_coupon' , function (req,res,next) {

  pool.getConnections(function (err,connection) {

    var sql="select coupon_id from User_Coupon where id=?";

    connection.query(sql,[req.session.user_id],function (err,data) {

      if (err) console.error("err : " + err);
      console.log(data);


    });

  });

});

app.post('/Login',function (req,res) {

  console.log("로그인 들어옴");

  console.log(req.body);

  var user = {
    id:req.body.id,
    password:req.body.password
  };

  pool.getConnection(function (err,connection) {

    var sql = "select id,password from User where id=?";

    connection.query(sql,[user.id],function (err,data) {

      for(key in data){

        console.log(data);
        var db= {
          key_id:data[key].Id,
          key_password:data[key].password
        }
      }
      if(data=="")
      {
        console.log("10000");
        res.send("아이디가 존재하지 않습니다.");
      }

      else if(user.password===db.key_password&&user.id===db.key_id)
      {
        console.log("20000");
        req.session.user_id = user.id;
        res.cookie('id',req.session.user_id);

        res.send(req.session.user_id);

      }
      else if (user.password===db.key_password||user.id===db.key_id)
      {
        console.log("30000");
        res.send("다시한번 확인 해주세요.");
      }
    });
  });

});



app.post('/Join' ,function (req,res,next) {

  console.log("왓다데이터!!!!!!!!!!!!!!");

  var id =req.body.id;
  var password= req.body.password;
  var name=req.body.name;
  var age=req.body.age;

  pool.getConnection(function (err,connection) {

    var data =[id,password,name,age];
    var sql = "insert into User(id,password,name,age) values(?)";

    connection.query(sql,[data],function (err, data) {

      if (err) console.error("err : " + err);
      console.log(data);
      res.send("회원가입 완료!");
      connection.release();
    });
  });

});
