var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'list';
    route.method = 'post';
    route.auth = true;
    route.handler = function * list(next) {
        this.body = 'hero';
    };

    route.validate = {
        body: {
        },
        type: 'application/json'
    };

    return route;
};
