'use strict';
var Routine = require('mongoose').model('Routine');
var Comment = require('mongoose').model('Comment');
var ExerciseService = require('./exercise');
var Helpers = require('./../helpers/storeImage');

exports.listRoutines = function * (params) {
    try {
        var options = {
            categoryId: params.category
        };
        
        if (params.name) {
            options.name = new RegExp(params.name, 'i');
        }
        
        var routines = yield Routine.find(options).skip(params.page * params.itemsPerPage).limit(params.itemsPerPage);
        
        for (var i = 0; i < routines.length; i++) {
            routines[i].liked = routines[i].likes.indexOf(params.userId) > -1;
        }

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
        
        var routine = yield Routine.findOne(options);

        var result = routine.toObject();

        result.liked = routine.likes.indexOf(params.userId) > -1;

        result.comments = yield Comment.find({routineId: params.routine}).limit(10);
        result.exercises = yield Exercise.find({routineId: params.routine}).limit(10);

        result.commentsCount = yield Comment.count({routineId: params.routine});
        result.exercisesCount = yield Exercise.count({routineId: params.routine});
        
        return result;
    } catch (error) {
        throw error;
    }
};

exports.createRoutine = function * (params, createdBy) {
    try {
        var createdAt = new Date();
        var imageUrl = null;
        var details = params.details;
        var exercises = params.exercises || [];
        var promises = [];

        var routine = new Routine({
            categoryId: details.categoryId,
            name: details.name,
            description: details.description,
            difficulty: details.difficulty || 1,
            createdAt: createdAt,
            createdBy: createdBy
        });
        
        routine = yield routine.save();
        imageUrl = yield Helpers.storeImage(details.image, routine.id);
        routine.imageUrl = imageUrl;
        yield routine.save();

        exercises.forEach(function(exercise, i) {
            promises.push(ExerciseService.createExercise(exercise, i, routine.id))
        });
        exercises = yield promises;
        routine.liked = false;

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
            
        var comments = yield Routine.findById(params.routineId).select('comments');
            
        return comments;
    } catch (err) {
        throw err;
    }
};

exports.getLikes = function * (params) {
    try {
        var options = {
            categoryId: params.category,
            _id: params.routine
        };
        
        var likes = yield Routine.find(options, {likes: {$slice: [params.page * params.itemsPerPage, params.itemsPerPage]}});

        return likes;
    } catch (error) {
        throw error;
    }
};

exports.getTags = function * (params) {
    var options = {
        categoryId: params.category,
        _id: params.routine
    };
    
    var tags = yield Routine.find(options, {tags: {$slice: [params.page * params.itemsPerPage, params.itemsPerPage]}});

    return tags;
};

exports.like = function * (params) {
    try {
        var routine = yield Routine.findById(params.routine);

        if (!routine) {
            throw new Error("Routine not found");
        }

        if (routine.likes.indexOf(params.userId) > -1) {
            throw new Error("Error");
        }

        routine.likes.push(params.userId);

        yield routine.save();

        return routine;
    } catch (err) {
        throw err;
    }
};

exports.unlike = function * (params) {
    try {
        var routine = yield Routine.findById(params.routine);

        if (!routine) {
            throw new Error("Routine not found");
        }

        if (routine.likes.indexOf(params.userId) < 0) {
            throw new Error("Error");
        }

        routine.likes.pull(params.userId);

        yield routine.save();

        return routine;
    } catch (err) {
        throw err;
    }
};