var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'details';
    route.method = 'get';

    route.handler = function * list(next) {
        var options = {
            routineId: this.query.routineId
        }
        var comments = yield services.get('comment').listComments(options);
        var exercises = yield services.get('exercise').listExercises(options);

        this.status = 200;
        this.body = {
            exercises: exercises,
            comments: comments
        };
    };

    return route;
};
