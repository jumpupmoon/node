// node에 내장된 http 모듈 불러오기(common.js 방식)
var http = require("http");
// http 모듈 불러오기(ecmascript 방식)
//import http from "http";

// http에 내장된 서버를 만들 수 있는 함수 호출
var server = http.createServer();
var port = 3333;

server.listen(port, function(){
    console.log("웹서버 시작", port);
})

server.on("connection", function(socket){
    console.log("클라이언트 접속!");
    console.log(socket.address().address);
    console.log(socket.address().port);
})

server.on("request", function(req, res){
    console.log("클라이언트 요청!");
    res.write("<h1>hello world</h1>");
    res.write("<h2>hello world</h2>");
    res.end();
})