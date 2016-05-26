var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'add';
    route.method = 'post';
    route.auth = true;

    route.handler = function * add(next) {
        var exercise = yield services.get('exercise').createExercise(this.request.body);

        this.status = 200;
        this.body = {
            exercise: exercise
        };
    };

    return route;
};
