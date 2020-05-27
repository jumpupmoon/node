var express = require("express");
var router = express.Router();

// url '/home/'
router.get('/', function(req, res, next){
    res.send('home!');
})

// url '/home/inside'
router.get('/inside', function(req, res, next){
  res.send('home inside');  
})

// 해당 변수 모듈화
module.exports = router;