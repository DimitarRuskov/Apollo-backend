var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'add';
    route.method = 'post';
    route.auth = true;
    
    route.handler = function * add(next) {
        var createdBy = this.state.user.id;
        var routine = yield services.get('routine').createRoutine(this.request.body, createdBy);
        this.status = 200;
        this.body = {
            routine: routine
        };
    };

    route.validate = {
        body: Joi.object({
            categoryId: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string(),
            difficulty: Joi.number().min(1).max(10).required()
        })
    };

    return route;
};
