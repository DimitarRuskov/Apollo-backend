var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'getProfile';
    route.method = 'post';
    route.auth = true;
    
    route.handler = function * getProfile(next) {
        var id = this.state.user.id;
        var profile = yield services['user'].getProfile(id);
        this.status = 200;
        this.body = {
            profile: profile
        };
    };

    route.validate = {
        body: Joi.object({
        }).required(),
        type: 'application/json'
    };

    return route;
};
