var http = require('http');
var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'hue.c4yiq5vuopvi.ap-northeast-2.rds.amazonaws.com'
  port: 3306,
  user: 'root',
  password: 'seongwon9179',
  database: 'CouponGo',
});

var app = express(app);
app.use(express.static(__dirname));

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
