var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'list';
    route.method = 'post';

    route.handler = function * register(next) {
        yield services['routine'].listRoutines(this);
    };

    route.validate = {
        body: Joi.object({
            params: Joi.object({
                categoryId: Joi.string().required()
            }).required()
        }),
        type: 'application/json'
    };

    return route;
};
