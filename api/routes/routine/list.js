var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'list';
    route.method = 'get';
    
    route.handler = function * list(next) {
        var routines = yield services.get('routine').listRoutines(this.request.body.categoryId);
        
        this.status = 200;
        this.body = {
            routines: routines
        };
    };

    route.validate = {
        body: Joi.object({
            categoryId: Joi.string().required()
        })
    };

    return route;
};
