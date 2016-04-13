var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'login';
    route.method = 'post';

    route.handler = function * login(next) {
        yield services['user'].login(this);
        this.throwError(400, 'test');
    };

    route.validate = {
        body: Joi.object({
            credentials: Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required()
            }).required()
        }).required(),
        type: 'application/json'
    };

    return route;
};
