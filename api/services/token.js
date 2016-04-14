var jwt = require('koa-jwt');
var config = require('../../config/config');

exports.create = function * (body) {
    try {
        var token = jwt.sign(body, config.app.jwt.secret, {expiresIn: config.app.jwt.duration});
        return token;
    } catch (err) {
        throw err;
    }
};
