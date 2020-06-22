const express = require('express');
const router = express.Router();
const userQuery = require('../query/userQuery');
const error = require('../error');


//메인
router.get('/', function(req, res) {
    res.render('home', {user: req.session.loggedIn});
})

//로그인
router.route('/login')
    .get(function(req, res) {
        res.render('user/login', {error: false, user: req.session.loggedIn});
    })

    .post(function(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        userQuery.login([email, password], function(err, users) {
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
                res.render('user/login', {error : true, user: req.session.loggedIn});
            }
        })
    })

//로그아웃
router.get('/logout', function(req, res) {
    if(req.session.loggedIn) {
        req.session.destroy(function(err) {
            error(err, res, res.redirect('/'));
        })
    } else {
        res.redirect('/');
    }
})

// 회원가입
router.route('/signup')
    .get(function(req, res) {
        res.render('user/signup', {errorMessage: null, user: req.session.loggedIn});
    })

    .post(function(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        var age = null;
        if(req.body.age) age = req.body.age;

        // 이메일 중복 체크
        userQuery.emailCheck(email, function(err, users) {
            if(err) { // 이메일 중복 체크 오류
                res.render('signup', {errorMessage: '이메일 중복체크 오류', user: req.session.loggedIn});
            } else if(users.length > 0) { // 이메일 중복시
                res.render('signup', {errorMessage: '이미 존재하는 이메일', user: req.session.loggedIn});

            } else { // 이메일 중복 없을 때 회원가입 처리
                userQuery.insert([email, password, age], function(err, result) {
                    if(err) { // 회원가입 오류
                        console.log('err -> ', err);
                        res.render('user/signup', {errorMessage: '생성 오류', user: req.session.loggedIn});
                    } else { // 회원가입 성공
                        res.redirect('/login');
                    }
                })
            }
        })
    })

//유저목록
router.get('/list', function(req, res) {
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    userQuery.getList(function(err, rows) {
        error(err, res, res.render('user/list', {users:rows, user: req.session.loggedIn}));
    });
})

module.exports = router;