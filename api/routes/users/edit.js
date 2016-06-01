var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'post';
    route.auth = true;
    route.pathParams = {
        'users': 'username'
    };
    
    route.handler = function * (next) {
        this.status = 200;
        this.body = {
        };
    };

    route.validate = {
        body: Joi.object({
            params: Joi.object({
            }).required()
        }).required()
    };

    return route;
};
