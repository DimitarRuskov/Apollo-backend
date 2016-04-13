var Joi = require('koa-joi-router').Joi;
var User = require('mongoose').model('User');

module.exports = function(app) {
    app.use(function * (next) {
        var bodySchema = Joi.object({
            credentials: Joi.object({
                sessionKey: Joi.string().required()
            }).required()
        });
        
        var validationRes = Joi.validate(this.request.body, bodySchema);
        
        if (validationRes.error !== null) {
            var errors = [];
            
            (Array.isArray(validationRes.error.details) ? validationRes.error.details.forEach(function(error) {
                errors.push({
                    field: error.context.key,
                    message: error.message
                });
            }) : undefined);
            
            this.isAuthenthicated = false;
            
            this.authenthicationErrors = {
                code: 400,
                message: validationRes.error.name,
                errors: errors
            };
        } else {
            this.isAuthenthicated = true;
            this.user = {};
        }
        
        yield next;
    });
};
