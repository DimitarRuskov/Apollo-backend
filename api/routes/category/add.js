var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'add';
    route.method = 'post';
    route.auth = true;

    route.handler = function * add(next) {
        var category = yield services.get('category').createCategory(this.request.body, this.state.user);

        this.status = 200;
        this.body = {
            category: category
        };
    };

    route.validate = {
        body: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().required()
        })
    };

    return route;
};
