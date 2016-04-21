var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'list';
    route.method = 'get';
    
    route.handler = function * list(next) {
        yield services['routine'].listRoutines(this.request.body.params);
    };

    route.validate = {
        body: Joi.object({
            params: Joi.object({
                categoryId: Joi.string().required()
            }).required()
        })
    };

    return route;
};
