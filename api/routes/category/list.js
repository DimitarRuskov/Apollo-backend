var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'list';
    route.method = 'post';
    route.handler = function * list(next) {
        yield services['category'].listCategories(this);
    };
    
    route.validate = {
        body: Joi.object({
            credentials: Joi.object({
                
            }).required(),
            params: Joi.object({
                orderBy: Joi.object()
            }).required()
        }),
        type: 'application/json'
    };
    
    return route;
};
