var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'signup';
    route.method = 'post';

    route.handler = function * signUp(next) {
        yield services['user'].createUser(this.body);
    };

    route.validate = {
        body: {
            email: Joi.string().lowercase().email(),
            username: Joi.string().required(),
            password: Joi.string().required()
        },
        type: 'json'
    };

    return route;
};
