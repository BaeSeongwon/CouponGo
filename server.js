var http = require('http');
var express = require('express');

var app = express(app);
app.use(express.static(__dirname));

http.createServer(app).listen(80,function(){
  console.log("서버 실행 포트는 3000!!");
});

app.get('/',function(req,res){
  res.sendFile('index.html');
});
