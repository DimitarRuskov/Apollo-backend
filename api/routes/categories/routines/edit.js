var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'put';
    route.auth = true;
    route.pathParams = {
        'routines': 'routine',
        'categories': 'category'
    };
    
    route.handler = function * register(next) {
        var params = JSON.parse(JSON.stringify(this.request.body.params));
        params.routineId = this.params.routine;
        
        yield services.get('routine').editRoutine(params);
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
