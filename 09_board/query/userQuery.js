const connection = require('./connection');
const sendQuery = function(query, callback, params = null) {
    connection.query(query, params, function(err, result) {
        if(err) return callback(err);
        callback(null, result);
    })
}

module.exports = {
    getList: function(callback) { 
        sendQuery("SELECT * FROM users ORDER BY id DESC", callback);
    },

    login: function(params, callback ) {
        sendQuery('SELECT * FROM users WHERE email = ? and password = ?', callback, params);
    },

    emailCheck: function(params, callback) {
        sendQuery('SELECT * FROM users WHERE email = ?', callback, params);
    },
    
    insert: function(params, callback) {
        sendQuery('INSERT INTO users(email, password, age) VALUES (?, ?, ?)', callback, params);
    }
}