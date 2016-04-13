'use strict';
var User = require('mongoose').model('User');

exports.signIn = function * (_this) {

};

exports.getCurrentUser = function * (_this) {

};

exports.signOut = function * (_this) {

};

exports.createUser = function * (_this) {
    try {
        var user = new User({ username: _this.request.body.username, password: _this.request.body.password, registrationDate: new Date() });
        user = yield user.save();
    } catch (err) {
        throw err;
    }

    _this.status = 200;
    _this.body = { user: user };
};
