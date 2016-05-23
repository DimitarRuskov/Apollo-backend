var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'comment';
    route.method = 'post';
    route.auth = true;
    
    route.handler = function * add(next) {
        var createdBy = {
            id: this.state.user.id,
            username: this.state.user.username,
            imageUrl: this.state.user.imageUrl
        }
        
        var routine = yield services.get('routine').comment(this.request.body, createdBy);
        this.status = 200;
        this.body = {
            routine: routine
        };
    };

    route.validate = {
        body: Joi.object({
            routineId: Joi.string().required(),
            content: Joi.string().required()
        })
    };

    return route;
};
