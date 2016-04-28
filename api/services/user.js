'use strict';
var User = require('mongoose').model('User');
var bcrypt = require('bcrypt-nodejs');
var Helpers = require('./../helpers/storeImage');

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
        var user = new User({ username: params.username, email: params.email, password: params.password, registeredAt: new Date() });
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

exports.updateProfile = function * (params, id) {
    try {
        var imageUrl;
        var oldImageUrl;
        var userDetails;
        var updatedValues = {
            name: params.name,
            email: params.email,
            weight: params.weight,
            height: params.height
        };
        if (params.image) {
            imageUrl = yield Helpers.storeImage(params.image, id);
            updatedValues.imageUrl = imageUrl;
        }
        updatedValues = JSON.parse(JSON.stringify(updatedValues));
        userDetails = yield User.findByIdAndUpdate(id, updatedValues, {new: true});
        
        return userDetails;
    } catch (err) {
        throw err;
    }
};
