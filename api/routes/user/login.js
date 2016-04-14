var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'login';
    route.method = 'post';

    route.handler = function * login(next) {
        var user = yield services['user'].login(this.request.body.credentials);
        
        var token = yield services['token'].create(user);
        
        this.status = 200;
        this.body = {
            token: token
        };
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
