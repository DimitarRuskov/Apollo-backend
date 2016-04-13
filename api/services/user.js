'use strict';
var User = require('mongoose').model('User');

exports.login = function * (params) {
    
};

exports.getCurrentUser = function * (_this) {

};

exports.logout = function * (_this) {

};

exports.register = function * (_this) {
    try {
        var user = new User({ username: _this.request.body.username, password: _this.request.body.password, registrationDate: new Date() });
        user = yield user.save();
    } catch (err) {
        throw err;
    }

    _this.status = 200;
    _this.body = { user: user };
};
