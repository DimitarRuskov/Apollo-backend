var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'put';
    route.auth = true;
    route.pathParams = {
        'categories': 'category',
        'routines': 'routine',
        'exercises': 'exercise'
    };
    
    route.handler = function * register(next) {
        var params = JSON.parse(JSON.stringify(this.request.body.params));
        params.exerciseId = this.params.exercise;
        
        yield services.get('exercise').editExercise(params);
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
