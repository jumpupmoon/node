var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var port = 3000;
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
    res.render('home', {title: '안녕하세요'});
})

server.listen(port, function(){
    console.log('웹서버 시작!', port);
})