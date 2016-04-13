var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'add';
    route.method = 'post';

    route.handler = function * register(next) {
        if (!this.invalid) {
            yield services['category'].createCategory(this);
        } else {
            throw Error(this.invalid.body.msg);
        }
    };

    route.validate = {
        body: Joi.object({
            params: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required(),
                image: Joi.string().required()
            }).required()
        }),
        continueOnError: true,
        type: 'application/json'
    };

    return route;
};
