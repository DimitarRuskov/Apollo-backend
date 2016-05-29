var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'list';
    route.method = 'get';
    
    route.handler = function * list(next) {
        var routines = yield services.get('routine').listRoutines(this.query);
        
        this.status = 200;
        this.body = {
            routines: routines
        };
    };

    return route;
};
