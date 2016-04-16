'use strict';
var Routine = require('mongoose').model('Routine');

exports.listRoutines = function * (params) {
    try {
        var routines = yield Routine.find().sort(params.orderBy || {});
        return routines;
    } catch (err) {
        throw err;
    }
};

exports.createRoutine = function * (params) {
    try {
        var creationDate = new Date();
        
        var routine = new Routine({
            title: params.title,
            description: params.description,
            createdAt: creationDate,
            updatedAt: creationDate
        });
        
        routine = yield routine.save();
        return routine;
    } catch (err) {
        throw err;
    }
};

exports.editRoutine = function * (params) {
    try {
        var routine = null;
            
        return routine;
    } catch (err) {
        throw err;
    }
};
