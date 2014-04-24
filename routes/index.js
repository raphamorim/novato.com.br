var Newbie = require('../models/newbie'),
    Enterprise = require('../models/enterprise');

// Routes
exports.index = function(req, res) {
    res.render('index', {
        title: 'Newbie Project',
        description: 'using MongoDB, Express, AngularJs, NodeJs'
    });
};

exports.signUp = function(req, res) {
    var account = req.params.account;

    if (account != 'enterprise' && account != 'newbie') res.send(404).end();

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
    var account = req.params.account;

    switch (account) {
        case 'newbie':
            new Newbie(req.body).save(function(err, user) {
                if (err) {
                    return res.json(err).status(400);
                } else {
                    req.session.type = 'newbie';
                    req.session.userId = user._id;
                    res.redirect('/home');
                }
            });
            break;
        case 'enterprise':
            new Enterprise(req.body).save(function(err, user) {
                if (err) {
                    return res.json(err).status(400);
                } else {
                    req.session.type = 'enterprise';
                    req.session.userId = user._id;
                    res.redirect('/home');
                }
            });
            break;
    }
};

exports.home = function(req, res) {
    res.send("Welcome " + req.session.userId + "\n you as " + req.session.type);
}
