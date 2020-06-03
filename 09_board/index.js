var express = require('express');
var app = express();
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
    res.render('home', {user: req.session.loggedIn});
})

//로그인
app.get('/login', function(req, res) {
    res.render('login', {error: false, user: req.session.loggedIn});
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
                res.render('error');
            // 로그인 성공
            } else if(users.length > 0) {
                req.session.loggedIn = users[0];
                res.redirect('/');
            // 로그인 실패
            } else {
                res.render('login', {error : true, user: req.session.loggedIn});
            }
        });
})

//로그아웃
app.get('/logout', function(req, res) {
    if(req.session.loggedIn) {
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
                res.render('error');
            } else res.redirect('/');
        })
    } else {
        res.redirect('/');
    }
})

// 회원가입
app.get('/signup', function(req, res) {
    res.render('signup', {errorMessage: null, user: req.session.loggedIn});
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
                res.render('signup', {errorMessage: '이메일 중복체크 오류', user: req.session.loggedIn});
            } else if(users.length > 0) { // 이메일 중복시
                res.render('signup', {errorMessage: '이미 존재하는 이메일', user: req.session.loggedIn});

            } else { // 이메일 중복 없을 때 회원가입 처리
                connection.query(
                    `INSERT INTO users(email, password, age)
                        VALUES (?, ?, ?)`,
                    [email, password, age],
                    function(err2, result) {
                        if(err2) { // 회원가입 오류
                            console.log('err -> ', err2);
                            res.render('signup', {errorMessage: '생성 오류', user: req.session.loggedIn});
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
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    connection.query('SELECT * FROM users', function(err, rows) {
        if(err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('list', {users:rows, user: req.session.loggedIn});
        }
    })
})

//글 목록
app.get('/posts', function(req, res) {
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    connection.query(
        `SELECT post_id, title, email FROM posts 
            LEFT JOIN users ON user_id = users.id`,
        function(err, rows) {
            if(err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('posts', {
                    user: req.session.loggedIn, 
                    posts: rows
                });
            }
        }
    )
})

//글 상세보기
app.get('/post/:postId', function(req, res) {
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    const postId = Number(req.params.postId);
    connection.query(
        `SELECT post_id, title, contents, email FROM posts
            LEFT JOIN users ON user_id = users.id
            WHERE post_id = ?`,
        [postId],
        function(err, rows) {
            if(err) {
                console.log(err);
                res.render('error');
            } else if(rows.length < 1) {
                console.log('post 없음')
                res.render('error');
            } else {
                res.render('post', {
                    user: req.session.loggedIn,
                    post: rows[0]
                });
            }
        }
    )
})

//글 삭제
app.get('/post/delete/:postId', function(req, res) {
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    const postId = req.params.postId;
    connection.query(
        'DELETE FROM posts WHERE post_id = ?',
        [postId],
        function(err, rows) {
            if(err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/posts');
            }
        }
    )
})

//글쓰기
app.get('/posts/create', function(req, res) {
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    res.render('editPost', {user: req.session.loggedIn});
})

//글쓰기 처리
app.post('/posts/create', function(req, res) {
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    const title = req.body.title;
    const contents = req.body.contents;    
    connection.query(
        'INSERT INTO posts(title, contents, user_id) VALUES(?, ?, ?)',
        [title, contents, req.session.loggedIn.id],
        function(err, rows) {
            if(err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/posts');
            }
        }
    )
})

app.listen(port, function() {
    console.log('웹서버 시작!', port);
})