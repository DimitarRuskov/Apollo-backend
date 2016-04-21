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
<<<<<<< HEAD
        var userInfo = {
            roles: user._doc.roles,
            user: user._doc.username,
            id: user._doc._id.toString()
        };
                
        return userInfo;
=======

        return user.withoutPassword;
>>>>>>> 3e8d1738d6efee8d7233f5638623cd68efc068e6
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

exports.getProfile = function * (id) {
    var user = yield User.findById(id);
    
    if (!user) {
        var error = new Error('Error fetching profile details.');
        error.status = 413;
        error.name = 'MongooseError';
        
        throw error;
    }
    return user;
};