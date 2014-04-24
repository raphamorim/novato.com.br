exports.checkAuth = function(req, res, next) {
    if (!req.session.userId)
        res.status(401).json('You are not authorized to view this page');
    else
        next();
}

exports.auth = function(req, res, next) {
    if (req.session.userId)
        res.redirect('/home');
    else
        next();
}
