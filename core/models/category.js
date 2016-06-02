'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    createdAt: {type: Date, required: true},
    createdBy: {
        username: {type: String, required: true},
        id: {type: String, required: true}
    },
    updatedAt: {type: Date},
    imageUrl: {type: String}
});

mongoose.model('Category', CategorySchema);
