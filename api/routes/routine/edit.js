var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'edit';
    route.method = 'put';
    route.auth = true;
    
    route.handler = function * register(next) {
        yield services.get('routine').editRoutine(this.request.body.params);
    };

    route.validate = {
        body: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().required()
        })
    };

    return route;
};
