'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
    routineId: {type: String, required: true},
    order: {type: String, required: true},
    repetitions: {type: Number, required: false},
    sets: {type: Number, required: false},
    duration: {type: Number, required: false},
    break: {type: Number, required: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    imageUrl: {type: String, reuired: true},
    createdBy: {
        name: {type: String, required: true},
        id: {type: String, required: true}
    }
});

mongoose.model('Exercise', ExerciseSchema);
