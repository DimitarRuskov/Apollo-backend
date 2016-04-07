'use strict';
var passport = require('koa-passport');
var User = require('mongoose').model('User');

exports.signIn = function * (_this) {
    yield passport.authenticate('local', function * (err, user, info) {
        if (err) {
            throw err;
        }
        if (user === false) {
            _this.status = 401;
        } else {
            yield _this.login(user);
            _this.body = { user: user };
        }
    }).call(_this);
};

exports.getCurrentUser = function * (_this) {
    if (_this.passport.user) {
        _this.body = { user: _this.passport.user };
    }
    _this.status = 200;
};

exports.signOut = function * (_this) {
    _this.logout();
    _this.session = null;
    _this.status = 204;
};

exports.createUser = function * (_this) {
    try {
        var user = new User({ username: _this.request.body.username, password: _this.request.body.password, registrationDate: new Date() });
        user = yield user.save();
        yield _this.login(user);
    } catch (err) {
        throw err;
    }

    _this.status = 200;
    _this.body = { user: _this.passport.user };
};
