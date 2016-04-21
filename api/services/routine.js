'use strict';
var Routine = require('mongoose').model('Routine');

exports.listRoutines = function * (categoryId) {
    try {
        var routines = yield Routine.find({ 'categoryId': categoryId });
        return routines;
    } catch (err) {
        throw err;
    }
};

exports.createRoutine = function * (params) {
    try {
        var creationDate = new Date();
        
        var imageUrl = null;
        var routine = new Routine({
            categoryId: params.categoryId,
            name: params.name,
            description: params.description,
            createdAt: creationDate
        });
        
        routine = yield routine.save();
        imageUrl = yield storeImage(params.image, routine.id);
        routine = yield Routine.findByIdAndUpdate(routine.id, {imageUrl: imageUrl}, {new: true});
        
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

function * storeImage(image, id) {
    let extention = image.match(/^data:image\/(\w+);base64,/i)[1];
    let data = image.replace(/^data:image\/\w+;base64,/, "");
    let buffer = new Buffer(data, 'base64');
    let imageUrl = '/images/' + id + '.' + extention;
    yield co(fs.writeFile(path.join(config.app.publicDir, imageUrl), buffer));
    return imageUrl;
}