var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var port = 3000;
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname, 'public')));

var mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
})

app.get('/', function(req, res) {
    res.render('home');
})

app.get('/list', function(req, res) {
    connection.query('SELECT * FROM users', function(err, rows){
        if(err) {
            console.log(err);
        } 
        res.render('list', {users:rows});
    })
})

server.listen(port, function(){
    console.log('웹서버 시작!', port);
})