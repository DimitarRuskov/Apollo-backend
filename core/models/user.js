'use strict';

var bcrypt = require('../../lib/bcrypt-thunk');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var co = require('co');

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true, lowercase: true},
    name: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    registeredAt: {type: Date, required: true},
    roles: {type: [String]},
    imageUrl: {type: String, required: false}
}, {
    toJSON: {
        transform: function(doc, ret, options) {
            delete ret.password;
        }
    }
});

UserSchema.pre('save', function(done) {
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

UserSchema.virtual('withoutPassword').get(function() {
    return {
        id: this._id.toString(),
        username: this.username,
        imageUrl: this.imageUrl,
        roles: this.roles
    };
});

UserSchema.methods.comparePassword = function * (candidatePassword) {
    return yield bcrypt.compare(candidatePassword, this.password);
};

UserSchema.statics.passwordMatches = function * (username, password) {
    var user = yield this.findOne({ username: username.toLowerCase() }).exec();
    if (!user) {
        throw new Error('User not found');
    }

    if (yield user.comparePassword(password)) {
        return user;
    }

    throw new Error('Wrong credentials');
};

mongoose.model('User', UserSchema);
