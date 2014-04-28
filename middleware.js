exports.auth = function(req, res, next) {
    var privatePages = ['/home'];

    if(privatePages.indexOf(req.url) >= 0)
        if (!req.session.userId)
            return res.send(401, 'You are not authorized to view this page')
    else
        if (req.session.userId) res.redirect('/home')

    next();
}
