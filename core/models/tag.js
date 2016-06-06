'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
    title: {type: String, required: true, unique: true},
    categoryId: {type: String, required: true}
});

mongoose.model('Tag', TagSchema);
