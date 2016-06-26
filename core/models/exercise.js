'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
    routineId: {type: String, required: true},
    order: {type: String, required: true},
    repetitions: {type: Number, required: false},
    sets: {type: Number, required: false},
    duration: {type: Number, required: false},
    name: {type: String, required: false},
    description: {type: String, required: false},
    imageUrl: {type: String, reuired: false}
});

mongoose.model('Exercise', ExerciseSchema);
