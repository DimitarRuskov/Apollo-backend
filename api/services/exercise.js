'use strict';
var Exercise = require('mongoose').model('Exercise');
var ExerciseDetails = require('mongoose').model('ExerciseDetails');

exports.listExercises = function * (params) {
    try {
        var exercise = yield Exercise.find().sort(params.orderBy || {});
        return exercise;
    } catch (err) {
        throw err;
    }
};

exports.createExercise = function * (params) {
    try {
        var exercise = new Exercise({});
        
        exercise = yield exercise.save();
        return exercise;
    } catch (err) {
        throw err;
    }
};

exports.editExercise = function * (params) {
    try {
        var exercise = null;
            
        return exercise;
    } catch (err) {
        throw err;
    }
};
