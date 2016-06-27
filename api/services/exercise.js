'use strict';
var Exercise = require('mongoose').model('Exercise');
var Helpers = require('./../helpers/storeImage');

exports.listExercises = function * (params) {
    try {
        var exercise = yield Exercise.find({'routineId': params.routineId})
        .skip(params.page * params.itemsPerPage)
        .limit(params.itemsPerPage);
        
        return exercise;
    } catch (err) {
        throw err;
    }
};

exports.createExercise = function * (params, order, routineId) {
    try {
        var exerciseProps = {
            routineId: routineId,
            order: order
        };

        if (params.type === 'break') {
            exerciseProps.duration = params.time;
            exercise = new Exercise(exerciseProps);
            return yield exercise.save();
        } else {
            exerciseProps.sets = params.sets;
            exerciseProps.name = params.name;
            exerciseProps.description = params.description;
            exerciseProps.repetitions = params.repetitions;

            var exercise = new Exercise(exerciseProps);
            yield exercise.save();
            exercise.imageUrl = yield Helpers.storeImage(params.image, exercise.id);
            yield exercise.save();

            return exercise;
        }
    } catch (err) {
        throw err;
    }
};

exports.createBreak = function * (params) {
    try {
        var exercise = new Exercise(params);

        exercise = yield exercise.save();
        return exercise;
    } catch (err) {
        throw err;
    }
};
