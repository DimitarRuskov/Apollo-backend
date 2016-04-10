var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'list';
    route.method = 'post';
    route.handler = function * list(next) {
        this.set('Access-Control-Allow-Origin', '*');
        this.body = { };
    };
    
    return route;
};
