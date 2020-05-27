var http = require("http");
var express = require("express");
var path = require("path");

var app = express();
var server = http.createServer(app);
var port = 3333;

server.listen(port, function(){
    console.log("웹서버 시작!", port);
})

// pug 템플릿 사용 설정
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", function(req, res){
    res.send("hello world");
})

app.get("/page2", function(req, res){
    res.send("page 2");
})

app.get('/pug', function(req, res){
    res.render('index', {title: 'PPPPPP'});
})

app.get('/pug/:title', function(req, res){
    var params = req.params;
    res.render('index', {title: params.title});
})

app.get('/home/:title', function(req, res){
    var params = req.params;
    res.render('home', {title: params.title});
})