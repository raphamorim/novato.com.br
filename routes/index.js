var Client = require('../models/client'),
    bcrypt = require('bcrypt');

// All project routes
exports.index = function(req, res) {
    res.render('index', {
        title: 'Newbie Project',
        description: 'using MongoDB, Express, AngularJs, NodeJs'
    });
};

exports.signUp = function(req, res) {
    var account = req.params.account;

    if (account != 'enterprise' && account != 'newbie')
        res.send(404).end();

    res.render('signup', {
        account: account,
        title: 'Continue like ' + account,
        description: 'It\'s super easy!'
    });
};

exports.partialForms = function(req, res) {
    res.render('partial/forms/' + req.params.name);
};

exports.register = function(req, res) {
    req.body.type = req.params.account;

    new Client(req.body).save(function(err, user) {
        if(err) return res.send(err);

        req.session.userId = user._id;
        res.redirect('/home');
    });
};

exports.home = function(req, res) {
    var userId = req.session.userId;

    Client.findOne({'_id': userId}, function(err, user) {
        res.send('Welcome ' + user.name);
    });
}

exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    Client.findOne({'email': email}, function(err, user) {
        bcrypt.compare(password, user.password, function(err, match) {
            if(match === true) {
                req.session.userId = user._id;
                res.redirect('/home');
            } else {
                // error ocurred on login :/
            }
        });
    });
}
