'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: false}
});

mongoose.model('Recipe', RecipeSchema);
