var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'register';
    route.method = 'post';

    route.handler = function * register(next) {
        yield services['user'].createUser(this);
    };

    route.validate = {
        body: {
            params: {
                email: Joi.string().lowercase().email(),
                username: Joi.string().required(),
                password: Joi.string().required()    
            }
        },
        type: 'application/json'
    };

    return route;
};
