var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'edit';
    route.method = 'post';
    route.auth = true;
    
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
