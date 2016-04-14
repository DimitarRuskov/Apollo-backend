var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'add';
    route.method = 'post';

    route.handler = function * register(next) {
        yield services['routine'].createRoutine(this);
    };

    route.validate = {
        body: Joi.object({
            params: Joi.object({
                categoryId: Joi.string().required(),
                name: Joi.string().required(),
                description: Joi.string().required(),
                image: Joi.string().required()
            }).required()
        }),
        type: 'application/json'
    };

    return route;
};
