var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'list';
    route.method = 'post';
    route.handler = function * list(next) {
        this.set('Access-Control-Allow-Origin', '*');
        console.log(this.request);
        yield services['category'].listCategories(this);
    };
    
    route.validate = {
        
    };
    
    return route;
};
