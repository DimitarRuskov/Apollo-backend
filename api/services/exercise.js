'use strict';
var Exercise = require('mongoose').model('Exercise');

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

exports.createExercise = function * (params) {
    try {
        var exercise = new Exercise({
            routineId: params.routineId,
            order: params.order,
            repetitions: params.repetitions,
            sets: params.sets,
            duration: params.duration,
            break: params.break,
            name: params.name,
            description: params.description,
            imageUrl: params.imageUrl
        });

        exercise = yield exercise.save();
        return exercise;
    } catch (err) {
        throw err;
    }
};
