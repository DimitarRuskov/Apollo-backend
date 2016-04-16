'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoutineSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    createdAt: {type: Date, required: true},
    createdBy: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    updatedAt: {type: Date},
    categoryId: {type: Scema.Types.ObjectId, required: true, ref: "Category"},
    duration: {type: Number, required: true},
    difficulty: {type: Number, required: true, min: 1, max: 5},
    exercises: {type: [Schema.Types.ObjectId], ref: "Exercise"}
});

mongoose.model('Routine', RoutineSchema);
