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
    createdBy: {type: String, required: true},
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
