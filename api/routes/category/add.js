var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'add';
    route.method = 'post';

    route.handler = function * register(next) {
        yield services['category'].createCategory(this);
    };

    route.validate = {
        body: Joi.object({
            params: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required()  
            })
        }),
        type: 'application/json'
    };

    return route;
};
