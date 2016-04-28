var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'register';
    route.method = 'post';

    route.handler = function * register(next) {
        var user = yield services.get('user').register(this.request.body.params);
        
        var token = yield services.get('token').create(user);
        
        this.status = 200;
        this.body = {
            token: token,
            userDetails: user
        };
    };

    route.validate = {
        body: {
            params: {
                email: Joi.string().lowercase().email(),
                username: Joi.string().required(),
                password: Joi.string().required()
            }
        }
    };

    return route;
};
