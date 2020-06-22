# Day 1 
## NVM 설치
1. node
2. nvm use {버전이름}
## Javscript
 - 모듈화 
     - why? 여러 파일에서 같은 변수 이름을 만들면 덮어씌어진다. 
     -> common.js -> ECMA Script
 - 표준화
 - Javscript 인터프리터 (Javascript -> 컴퓨터 언어로 변환하는 것)
     -> Chrome, Firefox, IE 내장된 엔진
         -> 엔진에 따라서 지원하는 표준화된 스크립트 버전이 다르다. 
 - Node.js
     - 서버사이드 Chrome V8 Engine 기반 Javascript 
 - Javascript는 독립된 시스템(웹, 서버)에서 자유롭게 사용할 수 있는 언어. 
     - 웹 (html 안에서) -> console. => 웹 개발자 도구 
     - 서버사이드 (node) -> cmd 창 (node 패키지가 작동되고 있는)
## NPM
- node를 깔면 자동으로 npm 설치됨
- cmd에서 `npm --version`
- 폴더 생성 -> 폴더로 들어가기 (`cd {폴더 이름}`)
    - `npm init` -> npm 패키지 생성
    - `npm i express --save` 
        -> `--save` 지금 있는 패키지에서만 사용 (설치)
    - `package.json` 안에 script 작성
        - "start": "node index.js"
        -> `npm run start` 라는 명령어로 실행 가능
    - 파일 수정 한 뒤에는 다시 실행
## Express 직접 설치하고 실행하기
1. `npm init`
2. `npm i express --save`
3. package.json에 start 스크립트 추가
    - "start": "node index.js"
4. `npm run start`로 테스트
## Express Generator 사용하기
1. `npm i expres-generator -g` 
  전역으로 (globally) express-generator라는 패키지 설치
2. `express --view=pug` 
  - pug template을 view engine으로 사용하는 express app 설치


# Day 2
## CRUD / GET,POST,PUT,DELETE
- CRUD
    - 방식
    - C = create = POST
    - R = read = GET
    - U = update = PUT
    - D = delete = DELETE
- GET, POST, PUT, DELETE
    - GET -> 어떤 걸 가져올지
        - ex. (get) /users -> 유저 정보를 다 달라
        - ex. (get) /user/5 -> 5번 유저 정보를 달라
    - POST -> 생성할 것
        - ex. (post) /user -> 유저를 생성한다
            - user 데이터를 함께 보낸다
        - 같은 데이터 2번 보내면 2개 생성 (같은걸로)
    - PUT -> 수정/생성
        - ex. (put) /user -> 유저를 생성한다
        - ex. (put) /user/5
            -> 5번 유저가 없으면 생성하고 있으면 수정
        - 같은 데이터 2번 보내면 1개만 생성(두번째는 수정)
    - DELETE -> 삭제
        - ex. (delete) /user/5 -> 5번 유저 정보를 삭제 
## REST API
- CRUD를 기반으로 함
- /user/5, /users, /user -> url 설계를 CRUD 기반으로 함 
## 로그인
### REST API
- 이메일, 패스워드를 받아서 (요청) 성공, 실패 여부를 응답
    - 성공 = 이메일, 패스워드가 원하는 문자열과 같으면
    - 실패 = 이메일, 패스워드가 다르면
        - 실패 1. 아예 이메일, 패스워드가 없다. -> 잘못된 요청이다.
        - 실패 2. 이메일이 틀렸다. -> 이메일이 틀렸다. (회원정보가 없다.)
        - 실패 3. 패스워드가 틀렸다. -> 패스워드가 틀렸다.
 - CRUD 중에...? 
    - (POST) /login
### (+) 함수
- input을 받아서 -> {...} -> output을 내는 것
- `return {값}`으로 return 한다. 
- input = 인자, 매개변수, parameter,...

```javascript
var add = function(a, b) {
    return a+b;
}

var result = add(3, 5)// add 함수 호출
console.log(result) // 8이 log에 찍힘
```

```javascript
var abc = function (a) { // return이 없는 함수
    console.log(a);
}
abc('이거 좀 출력해라'); // abc 함수 호출
```

```javascript
var c = function () {
    return '아무것도 없는 함수'
}
c(); // c 함수 호출
```

```javascript
function (req, res) {
    res.send('...')    
}
```
### JSON = JavaScript Object Notation
- Key, Value로 이루어진 값

```json
{ "name" : "Jenny" }
```
```javascript
var a = { name : "Jenny" }
a.name // "Jenny"
a["name"] // "Jenny"

var user = {
    user1: {
        name: "Jenny",
        age: 13
    },
    user2: {
        name: "Nusdf",
        age: 20
    }
}
user.user1.name // Jenny
user.user2.age

var req = {
    body: {
        email: "aaa@gmail.com",
        password: "12345"
    }
}
var email = req.body.email
var password = req.body.password
```

```javascript
// array = list = 배열
var users = {
    "usernames": ["Jenny", "Perl", "Apple"],
    "ages": [13, 24, 30],
}
users.usernames[0] // Jenny
users.ages[2] // 30

var aa = {
    "users": [
        {
            "name": "asef",
            "age": 20
        },
        {
            "name": "PAB", 
            "age": 30
        }
    ]
}
aa.users[0].name // asef
aa.users[1].age
```
### 조건 / 반복
A라면 B하고, 아니라면 C한다.
if (A) {
    B
} else if (A') {
    BB
} else {
    C
}

# Day 3
## SQL vs. NoSQL
- SQL: MySQL
    - 규정화되어있음
    - table
    - RDB = Relational Database 
- NoSQL: mongodb
    - 규정화 X
    - 어떤 data가 들어갈지 정해져 있지 않음.
    - 기본이 json 형태 
  
## MySQL
### MySQL 설치
- MYSQL 공식 홈페이지 설치 - Community 버전
- WAMP (ex. Bitnami WAMP) 
    - Windows Apache Mysql PHP -> 웹서버 구축에 필요한 서비스들을 모아서 설치하고 관리할 수 있게 해주는 툴
    - 참고: 생활코딩 MySQL 설치
- 설정 
  - username : root
  - password : 알아서
- 설치 확인: `mysql --version`
- GUI 툴 = workbench

### 환경 변수 편집
- mysql 설치 후 mysql 설치 된 파일 경로 복사 (ex. C:\Bitnami\wampstack....\mysql\bin)
- `시스템 환경 변수 편집` -> `환경 변수` -> Path -> 새로 만들기 -> 경로 붙여넣기
- 확인 후 cmd 재 실행
- `mysql --version`

### MySQL 실행
- MySQL 접속하기: `mysql -u root -p` -> 비밀번호 입력
- 데이터베이스 리스트 보기: `show databases;`
- 데이터베이스 생성: `CREATE DATABASE test DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;`
    - = test 데이터베이스 생성
    - utf8 인코딩 설정하기
- `->` => 쿼리가 끝나지 않은 상태
- `mysql>` => 새로운 쿼리를 입력할 수 있는 상태
- `USE test;` => test 데이터 베이스 이용
- Table 생성하기
```sql
CREATE TABLE users (
    id int auto_increment primary key,
    email varchar(50) not null,
    password varchar(50) not null
);
```
- 엑셀 - sheet 1개 = table, 파일 1개 = database
  
- table 목록 보기 `show tables;`
- table 정보 확인하기 `desc {테이블 이름}`
- table에 값 추가하기
```sql
INSERT INTO users(email, password)
    VALUES ("test@test.com", "test1234");
```

- table 전체 row 불러오기
```sql
// 전체 Row, Column 불러오기
SELECT * from users; 

// 전체 Row, Email column 불러오기
SELECT email from users; 

// 전체 ROW, id, email column 불러오기
SELECT id, email from users; 

// Email이 test@test.com 인 Row만 불러오기
SELECT * from users
    WHERE email="test@test.com"

// id가 2 이상인 row의 id, email 불러오기
SELECT id, email from users
    WHERE id > 1;
```


## MYSQL + EXPRESS 
### MYSQL 모듈 사용
- `npm i --save mysql2` mysql2 패키지 설치 
```javascript
var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306, // db 포트
    user: "root", // user 이름
    password: "...",  // 비밀번호
    database: "test", // database 이름
})

// 쿼리 사용 방법
connection.query(`쿼리`, function(err, rows) {
    // ...
})
```

### Bootstrap
- [Bootstrap 홈페이지](https://getbootstrap.com/)
- CDN 붙여넣기 (head 안에)
```html
<!-- CSS only -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

<!-- JS, Popper.js, and jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
```

### ejs 템플릿 분리
- 파일로 분리 (ex. `nav.ejs`, `head.ejs`)
- 파일 불러오기 (ex. `<% include ("./head.ejs") %>`)


### For문
```javascript
var fruits = ["apple", "banana", "pineapple"];
fruits[0] // "apple"

for (var i = 0; i < 3 ; i++ ) {
    console.log(i) // 0 -> 1 -> 2
}

for (var i = 0; i < 3 ; i++ ){
    var target = fruits[i];
    console.log(target) // "apple" -> "banana" -> "pineapple"
}

for (var target of fruits) {
    console.log(target) // "apple" -> "banana" -> "pineapple"
}

fruits.forEach( function(target, index) {
    console.log(target); // "apple"
    console.log(index); // 숫자
})
```

### 템플릿 안에서 for문 사용하기
```html
<% for (var user of users) { %>
<tr>
    <th scope="row"><%= user.id %></th>
    <td><%= user.email %></td>
    <td><%= user.password %></td>
</tr>
<% } %>
```

### 변수의 Scope
- 변수/상수를 사용할 수 있는 범위
```javascript
function(req, res) {
    var email = "test@test.com"
    console.log(email); // "test@test.com"

    function () {
        var email = "abc@abc.com"
        console.log(email); // "abc@abc.com"
    }
}

console.log(email);// 오류
```

## callback
```javascript
// login -> 쿼리 -> 쿼리2 -> 성공
app.get('/login', function(req, res) {
    // (1) ...
    connection.query('쿼리', function(err, result) {
        // (2) ...
        connection.query('쿼리2', function(err2, result2) {
            // (3) ...
            res.send('성공')
        })
    })
})
// login ->  성공 -> 쿼리 & 쿼리2 결과
app.get('/login', function(req, res) {
    // (1) ...
    connection.query('쿼리', function(err, result) {
        // (2) ...
    })
    connection.query('쿼리2', function(err, result) {
        // (3) ...
    })
    res.send('성공')
})
```

## 쿠키와 세션
### 쿠키 
- 브라우저에 저장되는 정보 (= 클라이언트)
    - 자동 로그인 정보, 로그인 없이 장바구니
    - 팝업 (오늘 안 띄우기)
### 세션 
- 서버에 저장
    - request -> 고유한 id 존재
        - 고유한 id 마다 세션 저장소 생성
- 쿠키보다는 안전
- 동접자 수가 많아지면 서버에 과부하가 걸릴 수 있음

### 세션 활용
- 세션 활용 라이브러리 설치 (`express-session`)
- session 설정 (open)
    - req -> session 을 보유
    - `req.session`으로 세션 정보를 가지고 올 수 있음
    - ex. `req.session.email = "test@test.com"` 라고 저장하면 
    그다음 request부터 `req.session.email`로 접근 가능
- login 성공 시 req.session.email 에 성공한 email 저장
    - session이 있을 경우 
        - navigation 로그인 , 회원가입 X
        - 홈에 로그인된 이메일 표시
        - 로그아웃

## 게시판
- 글쓰기 (create) O
- 글 수정 (update) -> 작성자만
- 글 삭제 (delete) O -> 작성자만 
- 글 불러오기 (read) - 1개씩 O
- 목록 O
- 게시판은 로그인한 유저만 접근 가능하도록 O

```
npm i --save express ejs mysql2 express-session
```

### 조회수
- 처음 만들어진 글 조회수가 0
- 글을 읽을 때마다 조회수 +1
    (+ 작성자 이외)
- 글 <- 조회수 -> post 테이블 안에 column 추가
1. [O] post 테이블에 `view_count` column 추가
    - int / default=0 / not null 
2. [O] 조회수를 목록에 표시
3. 글에 들어갔을 때 조회수 +1
4. (+심화) 작성자 이외의 사람만 카운팅

### 좋아요 ! 기능 추가하기
- 기본 0, 버튼을 누를때마다 +1
    (+심화: 한사람이 1좋아요만 가능) 
- 좋아요버튼 - 목록에 표시
- 목록에 좋아요 버튼 + 좋아요 개수
<개발 순서>
1. post 테이블에 `likes` column 추가
2. 좋아요 개수를 목록에 표시. 
3. 좋아요 버튼 추가
4. 좋아요 버튼 눌렀을 때 좋아요 수 +1


### 댓글 기능 추가 (1) 댓글 표시하기
1. (DB) 댓글 저장을 위한 TABLE 생성
- table 명: `comments`
2. (DB) `comments` 테이블에 샘플 데이터 추가
- `insert into comments ....`
3. (ejs) 게시글 페이지 하단에 댓글 표시할 html 추가 
4. (index.js/ejs) 게시글에 달린 댓글 불러와서 화면에 표시
- ejs에서 for 문 사용

### 댓글 기능 추가 (2) 댓글 추가하기
1. (ejs) 댓글 생성을 위한 html 추가
- form 사용하기
2. (index.js/ejs) 댓글 추가 기능 처리
- post method 사용
- 댓글 추가 완료 시 게시글 페이지(`/post/...`)로 redirect

### 심화
1. 댓글 삭제
2. 댓글 수정
3. 댓글 좋아요
4. (심화-안배운거) 댓글 입력 시간 표시
5. (심화-안배운거) 댓글 입력 순으로 정렬


## Day 6
### 댓글 테이블 만들기
(참고 - post 테이블 생성)
```sql
CREATE TABLE posts (
    post_id int auto_increment primary key,
    title varchar(100) not null,
    ...
    user_id int not null,
    foreign key (user_id) references users(id)
)
```
* 나의 실수를 되돌리기.. - `DROP TABLE 테이블명;`  -> 삭제
```sql
create table comments (
    comment_id int auto_increment primary key,
    description text not null,
    user_id int not null,
    post_id int not null,
    foreign key (user_id) references users(id),
    foreign key (post_id) references posts(post_id)
)
```
### 샘플 댓글 추가하기
1. `SELECT * from posts`로 post_id 확인
2. `SELECT * from users`로 user_id 확인
3. user_id, post_id 존재하는 걸로 댓글 추가
```sql
insert into comments(description, user_id, post_id)
    values ("댓글임", 1, 1);
```

### 댓글 불러오기 (정렬!)
```sql
select * from comments
    left join users on user_id = users.id
    where post_id = 1
    order by comment_id desc
```

### DB - GROUP BY & COUNT 
1. GROUP BY
```SQL
SELECT post_id, count(post_id)
FROM comments
GROUP BY post_id;
```

2. LEFT JOIN + COUNT
```sql
SELECT posts.post_id, count(comments.post_id)
FROM posts
LEFT JOIN comments ON comments.post_id = posts.post_id
GROUP BY comments.post_id, posts.post_id
ORDER BY posts.post_id ASC
```

3. AS
```sql
SELECT p.post_id, count(c.post_id) AS cnt
FROM posts AS p
LEFT JOIN comments AS c
    ON c.post_id = p.post_id
GROUP BY c.post_id, p.post_id
ORDER BY p.post_id ASC
```

4. 게시판 목록 쿼리 완료!!
```sql
SELECT p.post_id, p.title, u.email, p.user_id, p.view_count, 
        p.likes, count(c.post_id) AS comment_count
FROM posts AS p
LEFT JOIN users AS u
    ON p.user_id = u.id
LEFT JOIN comments AS c
    ON c.post_id = p.post_id
GROUP BY c.post_id, p.post_id
ORDER BY p.post_id ASC;
```


### RDS
1. 접속
* mysql -h 엔드포인트복사 -u root -p
2. 설정하기
```sql
- 데이터베이스 생성
CREATE DATABASE board DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

USE board;

- USER 테이블 생성
CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) not null,
    age INT
);

- POST 테이블 생성
CREATE TABLE posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    contents VARCHAR(50) NOT NULL,
    view_count INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

- COMMENTS 테이블 생성
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
)
```

## 배포 (Hosting)
1. RDS 새로 만들기
2. EC2 -> 클라우드 컴퓨터 생성
3. 프로젝트 파일을 원격 컴퓨터에 옮기기
(쉬운버전)
4. 프로젝트 실행
5. EC2에 IP를 연결해서 IP로 프로젝트 접근
(어려운버전)
4, 5 동일
6. ssh 접근 주소 // ec2 -> 인스턴스 -> 연결

### RDS
1. 접속
* mysql -h 엔드포인트복사 -u root -p
2. 설정하기
```sql
- 데이터베이스 생성
CREATE DATABASE board DEFAULT CHARSET=utf8 COLLATE=utf8_general_di;

- USER 테이블 생성
CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) not null,
    age INT
);

- POST 테이블 생성
CREATE TABLE posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    contents VARCHAR(50) NOT NULL,
    view_count INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

- COMMENTS 테이블 생성
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
)
```
3. `index.js`에서 connection 변경
```js
const connection = mysql.createConnection({
    host: 'blockchain-database.c7pvhdlpkam9.ap-northeast-2.rds.amazonaws.com', // 엔드포인트
    port: 3306,
    user: 'root',
    password: 'test1234', // RDS 비밀번호
    database: 'board' // 데이터베이스 이름
})
```

### Filezilla 연결
- 파일-사이트관리자
- New Site
- 프로토콜 - SFTP로 변경
- 호스트에 ec2 주소 입력(ec2...)
- 로그온유형 - 키파일 
    - 찾아보기
    - .ssh로 가서 All files로 변경
    - 키파일 눌러서 열기
    - 사용자이름 ubuntu
- 연결!

### NVM 설치
```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash (복사)
$ source ~/.bashrc
$ nvm --version
$ nvm install 12.18.0
$ nvm use 12.18.0
프로젝트 패키지 설치 (express, ejs...) 
- 프로젝트 파일이 있는 폴더에서!
$ npm install
$ npm install -g nodemon
$ npm start
```


### Node 강제 종료
```
$ sudo netstat -lpn | grep :3333
-> id 4자리숫자
$ kill -9 0000
-> 0000에 id 입력
```


# Day 8

## PM2

```
$ npm i -g pm2 - pm2 설치
$ pm2 start index.js - pm2로 node index.js 실행
$ pm2 list - pm2 앱 목록 확인하기
$ pm2 monit - pm2 모니터링
$ pm2 stop 이름
$ pm2 delete 이름
```

## nginx

### nginx 설치

1. `sudo apt-get update`: apt-get 명령어 업데이트
2. `sudo apt-get install nginx`: nginx 설치
3. `sudo systemctl start nginx`: nginx 서버 실행
4. ec2의 ip 주소 들어가서 어떻게 나오는지 확인

기본 설정 파일 확인하기

1. `/var/www/html`
2. `cd /etc/nginx/sites-available`
3. `vi default`

권한 수정

1. `cd /var/www`
2. `sudo chmod 777 html`

파일 추가

1. `/var/www/html` 경로에 폴더 생성
2. 폴더에 프로젝트 파일 복사 (node_modules 제외)

3. 프로젝트 경로로 이동
4. `npm i` -> node_modules 설치
5. `npm i -g pm2` -> pm2 패키지 설치
6. `pm2 start index.js` -> pm2로 실행하기
7. ip 포트 3333으로 실행 -> 프로젝트 실행 확인
8. `sudo vi /etc/nginx/sites-available/default` -> 설정 파일로 이동
9. `i` 눌러서 수정 모드
10. proxy_pass를 설정

    ```
    server {
        listen 80......

        # index index....  -> 주석처리
        location / {
            proxy_pass http://localhost:3333;
            ....
        }
    }
    ```

11. `esc`->`:wq` 수정한거 저장하고 끄기
12. `sudo systemctl restart nginx`

### Ec2 보안 그룹 설정

- SSH / 내 IP로 설정
  - 집에서 SSH로 접근하고 싶으면 aws에 IP 추가
- HTTP / 위치 무관

### 리팩토링

1. [O] env 파일 분리
2. routes 폴더 정리
3. 쿼리용 db.js 생성 후 코드 정리

#### 기존 폴더 구조

- views
- index.js

#### 변경할 폴더 구조

- routes - route 경로 마다 분리
- index.js
- db.js -> query 날리는 용도

### ENV 설정

1. `.env` 이름으로 파일 생성
   ```
   DB_HOST=".."
   DB_PORT=3306
   DB_USER.....
   ...
   ```
2. 환경변수 입력
3. `npm i --save dotenv`
4. `index.js` 파일 상단에 `require('dotenv').config();`

### Route 정리하기

1. 기존 route 리스팅
   - / -> index.js
     - /
     - /login
     - /signup
     - /logout
     - /list
   - /posts -> posts.js
     - /
     - /create
   - /post -> post.js
     - /:postId
     - /delete/:postId
     - /edit/:postId
     - /like/:postId
   - /comment -> comment.js
     - /:postId


### PM2 로 ENV 사용하기

- process.json 만들기

  ```
  {
    "apps": [
      {
        "name": "board",
        "script": "node",
        "args": "index.js",
        "instances": 1,
        "watch": true,
        "exec_mode": "cluster",
        "env": {
          "DB_HOST": "...",
          "DB_PORT": 3306,
          "DB_USER": "root",
          "DB_PASSWORD": "...",
          "DB_DATABASE": "board",
          "SESSION_SECRET": "..."
        }
      }
    ]
  }
  ```

- `pm2 start process.json`

### ETC

- [필독서](https://www.sangkon.com/good_books_for_dev_2018/)

## Naming

(ex. background color, power point)

- Pascal Casing
  - 첫단어 대문자
  - ex. BackgroundColor, PowerPoint
- Camel Casing
  - 두번째 단어부터 대문자
  - ex. backgroundColor, powerPoint
- Snake casing
  - 언더바
  - ex. background_color, power_point
- Kebab Casing
  - 하이픈(-)
  - ex. background-color, power-point
- UPPER SNAKE CASE
  - 대문자, 언더바
  - ex. BACKGROUND_COLOR, POWER_POINT