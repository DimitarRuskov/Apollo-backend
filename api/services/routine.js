'use strict';
var Routine = require('mongoose').model('Routine');
var Helpers = require('./../helpers/storeImage');

exports.listRoutines = function * (params) {
    try {
        var options = {
            categoryId: params.category
        };
        
        if (params.name) {
            options.name = new RegExp(params.name, 'i');
        }
        
        var routines = yield Routine.find(options);
        return routines;
    } catch (err) {
        throw err;
    }
};

exports.createRoutine = function * (params, createdBy) {
    try {
        var createdAt = new Date();
        var imageUrl = null;
        var routine = new Routine({
            categoryId: params.categoryId,
            name: params.name,
            description: params.description,
            difficulty: params.difficulty || 1,
            createdAt: createdAt,
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

exports.comment = function * (params, createdBy) {
    try {
        var createdAt = new Date();
        
        yield Routine.findByIdAndUpdate(
            params.routineId,
            {$push: {'comments': {
                content: params.content,
                createdAt: createdAt,
                createdBy: {
                    id: createdBy.id,
                    username: createdBy.username,
                    imageUrl: createdBy.imageUrl
                }
            }}}, {new: true});
            
        var comments = yield Routine.findById(params.routineId).select('comments'); //  the upper func returns comments without the new one
            
        return comments;
    } catch (err) {
        throw err;
    }
};
