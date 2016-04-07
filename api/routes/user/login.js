var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'login';
    route.method = 'post';

    route.handler = function * login(next) {
        yield services['user'].signIn(this.body);
    };

    route.validate = {
        body: {
        },
        type: 'application/json'
    };

    return route;
};
