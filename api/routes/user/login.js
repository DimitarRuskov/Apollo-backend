var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};
    
    route.path = 'login';
    route.method = 'post';
    
    route.handler = function * login(next) {
        services['user'].signIn(this.body);
    };
    
    route.validate = {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required()
        },
        type: 'form'
    };
    
    return route;
};
