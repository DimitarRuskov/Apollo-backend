var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'login';
    route.method = 'post';

    route.handler = function * login(next) {
        yield services['user'].signIn(this);
    };

    route.validate = {
        body: {
            credentials: {
                username: Joi.string().required(),
                password: Joi.string().required()
            }
        },
        type: 'application/json'
    };

    return route;
};
