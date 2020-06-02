var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var port = 3000;
var path = require('path');
var session = require('express-session');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(
    session({
        secret: '@#%@%QVvv23v2@#%ere23erf', // 암호화를 위한 키
        resave: false, // 바뀌지 않더라도 항상 저장할지 여부
        saveUninitialized: true
    })
)

var mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
})

//메인
app.get('/', function(req, res) {
    res.render('home', {email: req.session.email});
})

//로그인
app.get('/login', function(req, res) {
    res.render('login', {error: false, email: req.session.email});
})

//로그인 처리
app.post('/login', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    connection.query(
        'SELECT * FROM users WHERE email = ? and password = ?',
        [email, password],
        function(err, users) {
            // 에러
            if(err) {
                console.log(err);
            // 로그인 성공
            } else if(users.length > 0) {
                req.session.email = email;
                res.redirect('/');
            // 로그인 실패
            } else {
                res.render('login', {error : true, email: req.session.email});
            }
        });
})

//로그아웃
app.get('/logout', function(req, res) {
    if(req.session.email) {
        req.session.destroy(function(err){
            if(err) console.log(err);
            else res.redirect('/');
        })
    } else {
        res.redirect('/');
    }
})

// 회원가입
app.get('/signup', function(req, res) {
    res.render('signup', {errorMessage: null, email: req.session.email});
})

// 회원가입 처리
app.post('/signup', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    var age = null;
    if(req.body.age) age = req.body.age;

    connection.query( // 이메일 중복 체크
        `SELECT * FROM users WHERE email = ?`,
        email,
        function(err, users) {
            if(err) { // 이메일 중복 체크 오류
                res.render('signup', {errorMessage: '이메일 중복체크 오류', email: req.session.email});
            } else if(users.length > 0) { // 이메일 중복시
                res.render('signup', {errorMessage: '이미 존재하는 이메일', email: req.session.email});

            } else { // 이메일 중복 없을 때 회원가입 처리
                connection.query(
                    `INSERT INTO users(email, password, age)
                        VALUES (?, ?, ?)`,
                    [email, password, age],
                    function(err2, result) {
                        if(err2) { // 회원가입 오류
                            console.log('err -> ', err2);
                            res.render('signup', {errorMessage: '생성 오류', email: req.session.email});
                        } else { // 회원가입 성공
                            res.redirect('/login');
                        }
                    }
                )
            }
        }
    )

})

//유저목록
app.get('/list', function(req, res) {
    connection.query('SELECT * FROM users', function(err, rows){
        if(err) {
            console.log(err);
        } 
        res.render('list', {users:rows, email: req.session.email});
    })
})

server.listen(port, function(){
    console.log('웹서버 시작!', port);
})