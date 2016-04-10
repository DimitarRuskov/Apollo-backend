'use strict';
var passport = require('koa-passport');
var Category = require('mongoose').model('Category');

exports.listCategories = function * (_this) {
    try {
        var params = _this.request.body.params || {};
        var categories = yield Category.find().sort(params.orderBy || {});
    } catch (err) {
        throw err;
    }

    _this.status = 200;
    _this.body = { categories: categories };
};

exports.createCategory = function * (_this) {
    try {
        var params = _this.request.body.params;
        var category = new Category({ name: params.name, description: params.description, updatedAt: new Date() });
        category = yield category.save();
    } catch (err) {
        throw err;
    }

    _this.status = 200;
    _this.body = { category: category };
};