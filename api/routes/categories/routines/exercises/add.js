var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'post';
    route.auth = true;
    route.pathParams = {
        'categories': 'category',
        'routines': 'routine'
    };
    
    route.handler = function * add(next) {
        var exercise = yield services.get('exercise').createExercise(this.request.body);

        this.status = 200;
        this.body = {
            exercise: exercise
        };
    };

    return route;
};
