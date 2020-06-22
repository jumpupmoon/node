const connection = require('./connection');
const sendQuery = function(query, callback, params = null) {
    connection.query(query, params, function(err, result) {
        if(err) return callback(err);
        callback(null, result);
    })
}

module.exports = {
    getOne: function(params, callback ) {
        sendQuery(
            `SELECT post_id, title, contents, email, user_id, hit FROM posts 
            LEFT JOIN users ON user_id = users.id
            WHERE post_id = ?`
            , callback, params
        );
    },
    getOneMod: function(params, callback ) {
        sendQuery(
            `SELECT title, contents FROM posts
            WHERE user_id = ? and post_id = ?`
            , callback, params
        );
    },
    getList: function(callback) { 
        sendQuery(
            `SELECT p.post_id, title, email, hit
                , (SELECT COUNT(l.post_id) FROM likes l WHERE l.post_id = p.post_id ) likes
                , (SELECT COUNT(c.post_id) FROM comments c WHERE c.post_id = p.post_id) comms 
            FROM posts p
            LEFT JOIN users u ON p.user_id = u.id
            ORDER BY p.post_id DESC`
            , callback
        );
    },
    insert: function(params, callback ) {
        sendQuery('INSERT INTO posts(title, contents, user_id) VALUES(?, ?, ?)', callback, params);
    },
    update: function(params, callback ) {
        sendQuery('UPDATE posts SET title = ?, contents = ? WHERE post_id = ?', callback, params);
    },
    delete: function(params, callback ) {
        sendQuery('DELETE FROM posts WHERE post_id = ?', callback, params);
    },
    like: function(params, callback ) {
        sendQuery('INSERT INTO likes(post_id, user_id) VALUES(?, ?)', callback, params);
    },
    hate: function(params, callback ) {
        sendQuery('DELETE FROM likes WHERE post_id =? AND user_id = ?', callback, params);
    },
    hitUp: function(params, callback ) {
        sendQuery('UPDATE posts SET hit = hit+1 WHERE post_id = ? and user_id != ?', callback, params);
    },
    likeCheck: function(params, callback ) {
        sendQuery('SELECT user_id FROM likes WHERE post_id =? and user_id =?', callback, params);
    },
    commentList: function(params, callback ) {
        sendQuery(
            `SELECT comm_id, email, description, user_id FROM comments
            LEFT JOIN users ON user_id = users.id
            WHERE post_id = ?
            ORDER BY comm_id DESC`
            , callback, params
        );
    },
    commentAdd: function(params, callback ) {
        sendQuery('INSERT INTO comments(post_id, user_id, description) VALUES(?, ?, ?)', callback, params);
    },
    commentDel: function(params, callback ) {
        sendQuery('DELETE FROM comments WHERE comm_id =?', callback, params);
    }
}