'use strict';
var co = require('co');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = require('mongoose').model('Category');

var RoutineSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    createdAt: {type: Date, required: true},
    createdBy: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    categoryId: {type: Scema.Types.ObjectId, required: true, ref: "Category"},
    duration: {type: Number, required: true},
    difficulty: {type: Number, required: true, min: 1, max: 5},
    exercises: {type: [Schema.Types.ObjectId], ref: "Exercise"},
    imageUrl: {type: String, required: false}
});

RoutineSchema.pre('save', function (done) {
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
