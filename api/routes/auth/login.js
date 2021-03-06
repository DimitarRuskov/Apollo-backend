var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'login';
    route.method = 'post';

    route.handler = function * (next) {
        var userDetails = yield services.get('auth').login(this.request.body);
        var token = yield services.get('token').create(userDetails);
        userDetails.token = token;
        
        this.status = 200;
        this.body = {
            userDetails: userDetails
        };
    };

    route.validate = {
        body: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        })
    };

    return route;
};
