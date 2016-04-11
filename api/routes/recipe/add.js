var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'add';
    route.method = 'post';
    route.auth = true;
    route.handler = function * list(next) {
        this.body = this.request.body;
    };
    route.validate = {
        body: Joi.object({
            params: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required()
            }).required()
        }).required(),
        type: 'application/json'
    };
    return route;
};
