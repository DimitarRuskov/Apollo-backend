'use strict';
var User = require('mongoose').model('User');
var Helpers = require('./../helpers/storeImage');

exports.edit = function * (params) {
    
};

exports.getProfile = function * (params) {
    var user = yield User.findOne({username: params.username});
    
    if (!user) {
        var error = new Error('Error fetching profile details.');
        error.status = 413;
        error.name = 'MongooseError';
        
        throw error;
    }
    
    return user.withoutPassword;
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
