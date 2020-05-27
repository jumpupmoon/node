var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
    res.send('user')
})

router.get('/profile', function(req, res, next){
    res.send('profile');
})

module.exports = router;