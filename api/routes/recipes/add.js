var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'post';
    route.auth = true;
    
    route.handler = function * list(next) {
        this.body = this.request.body;
    };
    
    return route;
};
