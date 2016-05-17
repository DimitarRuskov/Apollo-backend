'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
    routineId: {type: String, required: true},
    exerciseDetailsId: {type: String, required: true},
    order: {type: String, required: true},
    repetitions: {type: Number, required: false},
    time: {type: Number, required: false},
    break: {type: Number, required: false}
});

var ExerciseDetailsSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, require: false},
    imageUrl: {type: String, required: false}
});

mongoose.model('Exercise', ExerciseSchema);
mongoose.model('ExerciseDetails', ExerciseDetailsSchema);
