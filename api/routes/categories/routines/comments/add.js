var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'post';
    route.auth = true;
    route.pathParams = {
        'routines': 'routine',
        'categories': 'category'
    };

    route.handler = function * add(next) {
        var createdBy = {
            id: this.state.user.id,
            username: this.state.user.username,
            imageUrl: this.state.user.imageUrl
        };
        
        var params = {
            routineId: this.params.routine,
            content: this.request.body.content
        };
        
        var comment = yield services.get('comment').createComment(params, createdBy);
        this.status = 200;
        this.body = {
            comment: comment
        };
    };

    route.validate = {
        body: Joi.object({
            content: Joi.string().required()
        })
    };

    return route;
};
