var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'updateProfile';
    route.method = 'post';
    route.auth = true;
    
    route.handler = function * updateProfile(next) {
        var id = this.state.user.id;
        var user = yield services['user'].updateProfile(this.request.body, id);
        this.status = 200;
        this.body = {
            user: user
        };
    };

    route.validate = {
        body: Joi.object({
            name: Joi.string(),
            email: Joi.string().required(),
            image: Joi.string(),
            dateOfBirth: Joi.date(),
            weight: Joi.number(),
            height: Joi.number()
        })
    };

    return route;
};
