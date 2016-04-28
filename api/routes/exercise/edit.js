var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'edit';
    route.method = 'post';
    route.auth = true;
    
    route.handler = function * register(next) {
        yield services.get('exercise').editExercise(this.request.body.params);
    };

    route.validate = {
        body: Joi.object({
            params: Joi.object({
                name: Joi.string(),
                description: Joi.string(),
                image: Joi.string()
            }).required()
        })
    };

    return route;
};
