var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'login';
    route.method = 'post';

    route.handler = function * login(next) {
        var userDetails = yield services['user'].login(this.request.body);
        
        var token = yield services['token'].create(userDetails);
        
        this.status = 200;
        this.body = {
            token: token,
            userDetails: {
                id: userDetails.id,
                username: userDetails.username
            }
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
