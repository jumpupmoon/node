var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var port = 3333;

var homeRouter = require('./routes/home');
var userRouter = require('./routes/user');
// 모듈을 가져와서 사용
app.use('/home', homeRouter);
app.use('/user', userRouter);

server.listen(port, function(){
    console.log("서버 시작", port);
})