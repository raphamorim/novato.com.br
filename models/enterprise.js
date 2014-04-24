var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var enterprise = new Schema({
    fbId: Number,
    name: String,
    website: String,
    size: Number,
    categories: String,
    userName: String,
    userCity: String,
    userEmail: {
        type: String,
        unique: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Enterprise', enterprise);
