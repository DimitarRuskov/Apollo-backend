var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'get';
    route.pathParams = {
        'routines': 'routine',
        'categories': 'category'
    };
    
    route.handler = function * list(next) {
        var routine = yield services.get('routine').getRoutine(this.params);
        
        this.status = 200;
        this.body = {
            routine: routine
        };
    };

    return route;
};
