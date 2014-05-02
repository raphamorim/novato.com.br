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
    var account = req.params.account;

    if (account === 'newbie') {
        new Newbie(req.body).save(function(err, user) {
            req.session.type = account;
            req.session.userId = user._id;
        });
    } else if (account === 'enterprise') {
        new Enterprise(req.body).save(function(err, user) {
            req.session.type = account;
            req.session.userId = user._id;
        });
    }

    res.redirect('/home');
};

exports.home = function(req, res) {
    res.send("Welcome " + req.session.userId + "\n you as " + req.session.type);
}

exports.login = function(req, res) {

}
