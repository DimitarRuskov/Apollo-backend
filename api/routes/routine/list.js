var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'list';
    route.method = 'post';
    
    route.handler = function * list(next) {
        var routines = yield services['routine'].listRoutines(this.request.body.categoryId);
        
        this.status = 200;
        this.body = {
            routines: routines
        };
    };

    route.validate = {
        body: Joi.object({
            categoryId: Joi.string().required()
        }),
        type: 'application/json'
    };

    return route;
};
