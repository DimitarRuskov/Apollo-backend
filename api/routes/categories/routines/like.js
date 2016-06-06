var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'like';
    route.method = 'post';
    route.pathParams = {
        'routines': 'routine',
        'categories': 'category'
    };
    
    route.handler = function * list(next) {
        var params = this.params;
        params.userId = this.state.user.id;
        
        var routine = yield services.get('routine').like(params);
        
        this.body = {
            routine: routine
        };
    };

    return route;
};
