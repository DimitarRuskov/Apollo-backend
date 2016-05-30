'use strict';
var Category = require('mongoose').model('Category');
var Helpers = require('./../helpers/storeImage');

exports.listCategories = function * (params) {
    try {
        var categories = yield Category.find().sort(params.orderBy || {});
        return categories;
    } catch (err) {
        throw err;
    }
};

exports.createCategory = function * (params, user) {
    try {
        var creationDate = new Date();
        var imageUrl = null;
        
        var category = new Category({
            name: params.name,
            description: params.description,
            createdAt: creationDate,
            createdBy: {
                id: user.id,
                username: user.username
            }
        });
        
        category = yield category.save();
        imageUrl = yield Helpers.storeImage(params.image, category.id);
        category = yield Category.findByIdAndUpdate(category.id, {imageUrl: imageUrl}, {new: true});
        
        return category;
    } catch (err) {
        throw err;
    }
};
