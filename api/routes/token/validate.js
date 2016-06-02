var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'validate';
    route.method = 'post';

    route.handler = function * add(next) {
        this.body = {
            valid: (this.state.user ? true : false)
        };
    };

    return route;
};
