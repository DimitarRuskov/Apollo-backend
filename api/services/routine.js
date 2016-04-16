'use strict';
var fs = require('fs');
var co = require('co');
var path = require('path');
var config = require('../../config/config');
var Routine = require('mongoose').model('Routine');

exports.listRoutines = function * (_this) {
    try {
        var params = _this.request.body.params || {};
        var routines = yield Routine.find({categoryId: params.categoryId}).sort(params.orderBy || {});
        _this.status = 200;
        _this.body = { routines: routines };
    } catch (err) {
        throw err;
    }
};

exports.createRoutine = function * (_this) {
    try {
        var params = _this.request.body.params;
        var creationDate = new Date();
        var imageUrl = null;
        var routine = null;
       
       routine = new Routine({
            categoryId: params.categoryId,
            name: params.name,
            description: params.description,
            createdAt: creationDate
        });
        
        routine = yield routine.save();
        imageUrl = yield storeImage(params.image, routine.id);
        routine = yield Routine.findByIdAndUpdate(routine.id, {imageUrl: imageUrl}, {new:true});
        
        _this.status = 200;
        _this.body = { routine: routine };
    } catch (err) {
        throw err;
    }
};

function * storeImage(image, id) {
    let extention = image.match(/^data:image\/(\w+);base64,/i)[1];
    let data = image.replace(/^data:image\/\w+;base64,/, "");
    let buffer = new Buffer(data, 'base64');
    let imageUrl = '/images/' + id + '.' + extention;
    yield co(fs.writeFile(path.join(config.app.publicDir, imageUrl), buffer));
    return imageUrl;
}