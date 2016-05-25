var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'details';
    route.method = 'get';
    
    route.handler = function * list(next) {
        var comments = yield services.get('comment').listComments(this.query.routineId);
        var exercises = [];
        
        this.status = 200;
        this.body = {
            exercises: exercises,
            comments: comments
        };
    };

    return route;
};
