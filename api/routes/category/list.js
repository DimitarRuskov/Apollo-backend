var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'list';
    route.method = 'post';
    route.handler = function * list(next) {
        var categories = yield services['category'].listCategories(this.request.body);
        
        this.status = 200;
        this.body = {
            categories: categories
        };
    };
    
    route.validate = {
        body: Joi.object({
            orderBy: Joi.object()
        }),
        type: 'application/json'
    };
    
    return route;
};
