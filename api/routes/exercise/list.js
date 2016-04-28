var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'list';
    route.method = 'get';
    route.handler = function * list(next) {
        yield services.get('exercise').listExercises(this.request.body.params);
    };
    
    route.validate = {
        body: Joi.object({
            params: Joi.object({
                orderBy: Joi.object()
            }).required()
        })
    };
    
    return route;
};
