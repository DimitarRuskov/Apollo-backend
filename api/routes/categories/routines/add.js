var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'post';
    route.auth = true;
    route.pathParams = {
        'categories': 'category'
    };
    
    route.handler = function * add(next) {
        var createdBy = {
            id: this.state.user.id,
            username: this.state.user.username
        };

        var params = this.request.body;
        params.categoryId = this.params.category;
        
        var routine = yield services.get('routine').createRoutine(params, createdBy);
        this.status = 200;
        this.body = {
            routine: routine
        };
    };

    route.validate = {
        body: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string(),
            difficulty: Joi.number().min(1).max(10).required()
        })
    };

    return route;
};
