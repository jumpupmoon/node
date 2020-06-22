module.exports = function(err, res, last) {
    if(err) {
        console.log(err);
        res.render('error');
    } else {
        last;
    }
}