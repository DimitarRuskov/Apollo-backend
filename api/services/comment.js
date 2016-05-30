'use strict';

var Routine = require('mongoose').model('Routine');
var Comment = require('mongoose').model('Comment');

exports.createComment = function * (params, createdBy) {
    try {
        var routine = yield Routine.findOne({'_id': params.routineId});

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
};

exports.listComments = function * (params) {
    try {
        var count = yield Comment.count({routineId: params.routineId});
        var comments = yield Comment.find({routineId: params.routineId})
            .sort(params.orderBy || {createdAt: -1})
            .skip((Number(params.page) - 1) * 10)
            .limit(10);
        return {
            count: count,
            comments: comments
        };
    } catch (err) {
        throw err;
    }
};
