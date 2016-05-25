'use strict';

var Routine = require('mongoose').model('Routine');
var Comment = require('mongoose').model('Comment');

exports.comment = function * (params, createdBy) {
    try {
        
        var routine = yield Routine.findOne({'_id':  params.routineId});
    
        if (!routine) {
            var error = new Error('Invalid routine');
            error.status = 413;
            error.name = 'InvalidParams';
            
            throw error;
        }
        
        
        var createdAt = new Date();
        
        var comment = new Comment({
            routineId: params.routineId,
            content: params.content,
            createdAt: createdAt,
            createdBy: {
                id: createdBy.id,
                username: createdBy.username,
                imageUrl: createdBy.imageUrl
            }
        });
        
        comment = yield comment.save();
        return comment;
        
    } catch (err) {
        throw err;
    }
}

exports.listComments = function * (params) {
    try {
        var comments = yield Comment.find().sort(params.orderBy || {});
        return comments;
    } catch (err) {
        throw err;
    }
}