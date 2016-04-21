'use strict';
var User = require('mongoose').model('User');
var bcrypt = require('bcrypt-nodejs');

exports.login = function * (params) {
    var user = yield User.findOne({username: params.username});
    
    if (!user) {
        var error = new Error('Username and password do not match.');
        error.status = 401;
        error.name = 'AuthorizationError';
        
        throw error;
    }
    
    if (yield (
        new Promise(function(resolve, reject) {
            bcrypt.compare(params.password, user.password, function(err, matched) {
                if (err) { return reject(err); }
                return resolve(matched);
            });
        })
    )) {

        return user.withoutPassword;
    } else {
        var error = new Error('Username and password do not match.');
        error.status = 401;
        error.name = 'AuthorizationError';
        
        throw error;
    }
};

exports.register = function * (params) {
    try {
        var user = new User({ username: params.username, password: params.password, registrationDate: new Date() });
        user = yield user.save();
        
        return user.withoutPassword;
    } catch (err) {
        throw err;
    }
};

exports.edit = function * (params) {
    
};

exports.logout = function * (params) {
    
};

exports.getCurrentUser = function * (params) {
    
};