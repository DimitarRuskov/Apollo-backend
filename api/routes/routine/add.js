var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'add';
    route.method = 'post';
    route.auth = true;
    
    route.handler = function * register(next) {
        var createdBy = this.state.user.id;
        yield services['routine'].createRoutine(this.request.body, createdBy);
        this.status = 200;
        this.body = {
            
        };
    };

    route.validate = {
        body: Joi.object({
            categoryId: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().required()
        })
    };

    return route;
};
