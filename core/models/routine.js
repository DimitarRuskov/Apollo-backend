'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = require('mongoose').model('Category');
var co = require('co');

var RoutineSchema = new Schema({
    categoryId: {type: String, required: true},
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: false},
    createdAt: {type: Date, required: true}
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
