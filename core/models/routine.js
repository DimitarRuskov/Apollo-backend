'use strict';
var co = require('co');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = require('mongoose').model('Category');

var RoutineSchema = new Schema({
    categoryId: {type: String, required: true},
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    difficulty: {type: Number, required: true},
    createdAt: {type: Date, required: true},
    createdBy: {
        username: {type: String, required: true},
        id: {type: String, required: true}
    },
    likedBy: {type: Array, required: false, default: []},
    tags: {type: Array, required: false, default: []},
    imageUrl: {type: String, required: false}
});

var CommentSchema = new Schema({
    routineId: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, required: true},
    createdBy: {
        id: {type: String, required: true},
        username: {type: String, required: true},
        imageUrl: {type: String, required: false}
    }
});

RoutineSchema.pre('save', function(done) {
    co.wrap(function * () {
        try {
            var category = yield Category.findById(this.categoryId);
            if (!category || category === null) throw new Error('Invalid Category ID');
            done();
        } catch (err) {
            done(err);
        }
    }).call(this).then(done);
});

mongoose.model('Routine', RoutineSchema);
mongoose.model('Comment', CommentSchema);
