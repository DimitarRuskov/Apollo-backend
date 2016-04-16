'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    createdAt: {type: Date, required: true},
    createdBy: {type: String, required: true},
    updatedAt: {type: Date},
    routines: {type: [String]},
    imageUrl: {type: String}
});

mongoose.model('Category', CategorySchema);
