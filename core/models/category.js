'use strict';

var bcrypt = require('../../lib/bcrypt-thunk');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var co = require('co');

var CategorySchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    updatedAt: {type: Date, required: true}
});

mongoose.model('Category', CategorySchema);
