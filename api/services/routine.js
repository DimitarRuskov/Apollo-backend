'use strict';
var Routine = require('mongoose').model('Routine');
var Helpers = require('./__helpers');

exports.listRoutines = function * (categoryId) {
    try {
        var routines = yield Routine.find({ 'categoryId': categoryId });
        return routines;
    } catch (err) {
        throw err;
    }
};

exports.createRoutine = function * (params, createdBy) {
    try {
        var creationDate = new Date();
        var imageUrl = null;
        var routine = new Routine({
            categoryId: params.categoryId,
            name: params.name,
            description: params.description,
            createdAt: creationDate,
            createdBy: createdBy
        });
        
        routine = yield routine.save();
        imageUrl = yield Helpers.storeImage(params.image, routine.id);
        routine = yield Routine.findByIdAndUpdate(routine.id, {imageUrl: imageUrl}, {new: true});
        
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