'use strict';
var Recipe = require('mongoose').model('Recipe');

exports.listRecipes = function * (_this) {
    try {
        var params = _this.request.body.params || {};
        var recipes = yield Recipe.find().sort(params.orderBy || {});
        _this.status = 200;
        _this.body = { recipes: recipes };
    } catch (err) {
        throw err;
    }
};

exports.createRecipe = function * (_this) {
    try {
        var params = _this.request.body.params;
        var creationDate = new Date();
        
        var recipe = new Recipe({
            title: params.title,
            description: params.description,
            createdAt: creationDate,
            updatedAt: creationDate
        });
        
        recipe = yield recipe.save();
        
        _this.status = 200;
        _this.body = { recipe: recipe };
    } catch (err) {
        throw err;
    }
};
