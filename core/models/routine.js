'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoutineSchema = new Schema({
    categoryId: {type: String, required: true},
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: false},
    createdAt: {type: Date, required: true}
});

mongoose.model('Routine', RoutineSchema);
