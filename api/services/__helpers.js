'use strict';
var fs = require('fs');
var co = require('co');
var path = require('path');
var config = require('../../config/config');

exports.storeImage = function * storeImage(image, id) {
    let extention = image.match(/^data:image\/(\w+);base64,/i)[1];
    let data = image.replace(/^data:image\/\w+;base64,/, "");
    let buffer = new Buffer(data, 'base64');
    let imageUrl = '/images/' + id + '.' + extention;
    yield co(fs.writeFile(path.join(config.app.publicDir, imageUrl), buffer));
    return imageUrl;
}