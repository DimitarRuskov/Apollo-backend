var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'listComments';
    route.method = 'get';
    
    route.handler = function * list(next) {
        var comments = yield services.get('comment').listComments({routineId: this.query.routineId});
        
        this.status = 200;
        this.body = {
            comments: comments
        };
    };

    return route;
};
