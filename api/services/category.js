'use strict';
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
        
        var category = new Category({
            name: params.name,
            description: params.description,
            createdAt: creationDate,
            updatedAt: creationDate
        });
        
        category = yield category.save();
        
        _this.status = 200;
        _this.body = { category: category };
    } catch (err) {
        throw err;
    }
};
