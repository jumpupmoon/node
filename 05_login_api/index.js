var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/login', function(req, res){
    res.status(200).send({
        response: {
            massage: 'success',
            path: '/login'
        }
    });
})

app.post('/login', function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password) {
        res.status(403).send({error: {massage: '없음'}});
    }else if(email != 'aaa@gmail.com') {
        res.status(400).send({error: {massage: '이메일 틀림'}});
    }else if(password != '12345') {
        res.status(400).send({error: {massage: '비밀번호 틀림'}});
    }else {
        res.status(200).send({data: {massage: '로그인 성공'}});
    }

})

server.listen(port, function(){
    console.log('서버 시작!', port);
})
