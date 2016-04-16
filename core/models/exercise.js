'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date}
});

var ExerciseDetailSchema = new Schema({
    exerciseId: {type: Schema.Types.ObjectId, required: true, ref: "Exercise"},
    duration: {type: Number, required: true},
    repetitions: {type: Number, required: true},
    sets: {type: Number, required: true}
});

mongoose.model('Exercise', ExerciseSchema);
mongoose.model('ExerciseDetail', ExerciseDetailSchema);