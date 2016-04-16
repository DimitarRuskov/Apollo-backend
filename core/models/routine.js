'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = require('mongoose').model('Category');

var RoutineSchema = new Schema({
    categoryId: {type: String, required: true},
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: false},
    createdAt: {type: Date, required: true}
});

RoutineSchema.pre('save', function (next) {
    var _this = this;
    // var category = yield Category.find({_id : _this.categoryId});
    console.log(category);
});

mongoose.model('Routine', RoutineSchema);
