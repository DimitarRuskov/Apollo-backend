'use strict';

var bcrypt = require('../../lib/bcrypt-thunk');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var co = require('co');

var RecipeSchema = new Schema({
        title: { type: String, required: true, unique: true},
        description: { type: String, required: true },
        createdAt: {type: Date, required: true},
        updatedAt: {type: Date, required: false}
});

RecipeSchema.pre('save', function(done) {
    if (!this.isModified('password')) {
        return done();
    }

    co.wrap(function * () {
        try {
            var salt = yield bcrypt.genSalt();
            var hash = yield bcrypt.hash(this.password, salt);
            this.password = hash;
            done();
        } catch (err) {
            done(err);
        }
    }).call(this).then(done);
});

mongoose.model('Recipe', RecipeSchema);
