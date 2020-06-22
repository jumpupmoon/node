const express = require('express');
const router = express.Router();
const postQuery = require('../query/postQuery');
const error = require('../error');


//글 목록
router.get('/list', function(req, res) {
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    postQuery.getList(function(err, rows) {
        error(err, res, res.render('post/posts', {
            user: req.session.loggedIn, 
            posts: rows
        }))
    })
})

//글 상세보기
router.get('/detail/:postId', function(req, res) {
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    const postId = Number(req.params.postId);
    postQuery.getOne(postId, function(err, rows) {
        if(err) {
            console.log(err);
            res.render('error');
        } else if(rows.length < 1) {
            console.log('post 없음')
            res.render('error');
        } else {
            // 게시자가 아닐 경우 조회수 +1
            postQuery.hitUp([postId, req.session.loggedIn.id], function(err, hit) {
                if(err) {
                    console.log(err);
                    res.render('error');
                } else {
                    if(hit.changedRows > 0) rows[0].hit +=1;
                    // 좋아요 여부 체크
                    postQuery.likeCheck([postId, req.session.loggedIn.id], function(err, like) {
                        if(err) {
                            console.log(err);
                            res.render('error');
                        } else {
                            var like;
                            if(like.length > 0) like = true;
                            else like = false;

                            postQuery.commentList(postId, function(err, comms) {
                                error(err, res, res.render('post/post', {
                                    user: req.session.loggedIn,
                                    post: rows[0],
                                    like: like,
                                    comms: comms
                                }));
                            })
                        }
                    })
                }
            })
        }
    })
})

//글 삭제
router.get('/delete/:postId', function(req, res) {
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    const postId = req.params.postId;
    postQuery.delete(postId, function(err, rows) {
        error(err, res, res.redirect('/post/list'));
    })
})

// 글쓰기
router.route('/create')
    .all(function(req, res, next) {
        if(!req.session.loggedIn) {
            res.redirect('/logout');
            return
        } else {
            next();
        }
    })

    .get(function(req, res) {    
        res.render('post/editPost', {
            user: req.session.loggedIn,
            post: {title: '', contents: ''},
            action: '/post/create'
        });
    })

    .post(function(req, res) {
        const title = req.body.title;
        const contents = req.body.contents;
        postQuery.insert([title, contents, req.session.loggedIn.id], function(err, rows) {
            error(err, res, res.redirect('/post/list'));
        }) 
    })

// 글 수정
router.route('/edit/:postId')
    .all(function(req, res, next) {
        if(!req.session.loggedIn) {
            res.redirect('/logout');
            return
        } else {
            next();
        }
    })

    .get(function(req, res) {
        const postId = req.params.postId;
        postQuery.getOneMod([req.session.loggedIn.id, postId], function(err, rows) {
            if(err) {
                console.log(err);
                res.render('error');
            } else if(rows.length < 1) {
                res.render('eroor');
            } else {
                res.render('post/editPost', {
                    user: req.session.loggedIn,
                    post: rows[0],
                    action: '/post/edit/'+postId
                })
            }
        })
    })

    .post(function(req, res) {
        const title = req.body.title;
        const contents = req.body.contents;
        const postId = req.params.postId;
        postQuery.update([title, contents, postId], function(err, rows) {
            error(err, res, res.redirect('/post/detail/'+postId));
        })
    })

// 좋아요
router.get('/like/:postId', function(req, res) {
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    const postId = req.params.postId;
    postQuery.like([postId, req.session.loggedIn.id], function(err) {
        error(err, res, res.redirect('/post/detail/'+postId));
    })
})

// 좋아요 취소
router.get('/hate/:postId', function(req, res) {
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    const postId = req.params.postId;
    postQuery.hate([postId, req.session.loggedIn.id], function(err) {
        error(err, res, res.redirect('/post/detail/'+postId));
    })
})

// 댓글 등록
router.post('/comment', function(req, res) {
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    const postId = req.body.postId;
    const desc = req.body.desc;
    postQuery.commentAdd([postId, req.session.loggedIn.id, desc], function(err) {
        error(err, res, res.redirect('/post/detail/'+postId));
    })
})

// 댓글 삭제
router.get('/comment/delete/:postId/:commId', function(req, res) {
    if(!req.session.loggedIn) {
        res.redirect('/logout');
        return
    }

    const commId = req.params.commId;
    const postId = req.params.postId;
    postQuery.commentDel(commId, function(err) {
        error(err, res, res.redirect('/post/detail/'+postId));
    })
})

module.exports = router;