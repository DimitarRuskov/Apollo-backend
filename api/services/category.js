'use strict';
var fs = require('fs');
var co = require('co');
var path = require('path');
var config = require('../../config/config');
var Category = require('mongoose').model('Category');

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
            createdBy: user.id
        });
        
        category = yield category.save();
        imageUrl = yield storeImage(params.image, category.id);
        category = yield Category.findByIdAndUpdate(category.id, {imageUrl: imageUrl}, {new: true});
        
        return category;        
    } catch (err) {
        throw err;
    }
};

function * storeImage(image, id) {
    let extention = image.match(/^data:image\/(\w+);base64,/i)[1];
    let data = image.replace(/^data:image\/\w+;base64,/, "");
    let buffer = new Buffer(data, 'base64');
    let imageUrl = '/images/' + id + '.' + extention;
    yield co(fs.writeFile(path.join(config.app.publicDir, imageUrl), buffer));
    return imageUrl;
}