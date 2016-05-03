var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var subRoutes = [];

    var getSpecific = {
        path: ':username',
        method: 'get',
        handler: function * (next) {
            var user = yield services.get('user').getProfile(this.params);
                        
            this.status = 200;
            this.body = {
                userDetails: user
            };
        },
        validate: {
            params: {
                username: Joi.required()
            }
        }
    };
    
    subRoutes.push(getSpecific);
    
    return {
        subRoutes: subRoutes
    };
};
