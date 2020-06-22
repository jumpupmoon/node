const express = require('express');
const app = express();
const port = 3333;
const path = require('path');
const session = require('express-session');
require('dotenv').config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(
    session({
        secret: process.env.SESSION_SECRET, // 암호화를 위한 키
        resave: false, // 바뀌지 않더라도 항상 저장할지 여부
        saveUninitialized: true
    })
)

const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

app.use('/', userRouter);
app.use('/post', postRouter);

app.listen(port, function() {
    console.log('웹서버 시작!', port);
})