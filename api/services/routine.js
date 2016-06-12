'use strict';
var Routine = require('mongoose').model('Routine');
var Helpers = require('./../helpers/storeImage');

// checks if routine matches the specified category
function initialCheck(params) {
    if (params.category !== params.routine.categoryId) {
        throw new Error('Routine not found');
    }
}

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

exports.getRoutine = function * (params) {
    try {
        var options = {
            categoryId: params.category,
            _id: params.routine
        };
        
        var routines = yield Routine.find(options);
            
        return routines;
    } catch (error) {
        throw error;
    }
};

exports.createRoutine = function * (params, createdBy) {
    try {
        var createdAt = new Date();
        var imageUrl = null;
        var details = params.details;
        var exercises = params.exercises;

        var routine = new Routine({
            category: {
                id: details.categoryId,
                name: 'default'
            },
            name: details.name,
            description: details.description,
            difficulty: details.difficulty || 1,
            createdAt: createdAt,
            createdBy: createdBy
        });
        
        routine = yield routine.save();
        imageUrl = yield Helpers.storeImage(details.image, routine.id);
        routine = yield Routine.findByIdAndUpdate(routine.id, {imageUrl: imageUrl}, {new: true});

        if(exercises.length && exercises.length > 0) {
            //add exercises
        }
        
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

exports.getLikes = function * (params) {
    
};

exports.getTags = function * (params) {
    
};

exports.like = function * (params) {
    try {
        var routine = Routine.findByIdAndUpdate(params.routine, {
            $push: {
                'likedBy': params.userId
            }
        });
            
        return routine;
    } catch (err) {
        throw err;
    }
};

exports.unlike = function * (params) {
    try {
        var routine = Routine.findByIdAndUpdate(params.routine, {
            $pull: {
                'likedBy': params.userId
            }
        });
        
        return routine;
    } catch (err) {
        throw err;
    }
};
