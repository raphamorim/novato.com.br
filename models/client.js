var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

var client = new Schema({
    fbId: { type: Number, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: String,
    city: String,
    type: String,

    newbie: {
        website: String,
        about: String,
        academic: String,
        college: String,
        design: Number,
        development: Number,
        illustration: Number
    },

    enterprise: {
        name: String,
        website: String,
        size: Number,
        categories: String
    }

}, {
    versionKey: false
});

client.path('email').validate(function(email, respond){
    var sentId = this._id;
    var Client = mongoose.model('Client');
    Client.findOne({'email': email}, function(err, user){
        respond(user === null || user._id.toString() === sentId.toString());
    });
}, 'Duplicated value of "{PATH}", "{VALUE}" already exists.');

client.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('Client', client);
