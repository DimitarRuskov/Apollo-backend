'use strict';
var fs = require('fs');
var co = require('co');
var path = require('path');
var config = require('../../config/config');
var Category = require('mongoose').model('Category');

exports.listCategories = function * (_this) {
    try {
        var params = _this.request.body.params || {};
        var categories = yield Category.find().sort(params.orderBy || {});
        _this.status = 200;
        _this.body = { categories: categories };
    } catch (err) {
        throw err;
    }
};

exports.createCategory = function * (_this) {
    try {
        var params = _this.request.body.params;
        var creationDate = new Date();
        var imageUrl = null;
        
        var category = new Category({
            name: params.name,
            description: params.description,
            createdAt: creationDate,
            updatedAt: creationDate
        });
        
        category = yield category.save();
        imageUrl = yield storeImage(params.image, category.id);
        category = yield Category.findByIdAndUpdate(category.id, {imageUrl: imageUrl}, {new:true});
        
        _this.status = 200;
        _this.body = { category: category };
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