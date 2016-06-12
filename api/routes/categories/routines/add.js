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
        
        var routine = yield services.get('routine').createRoutine(params, createdBy);
        this.status = 200;
        this.body = {
            routine: routine
        };
    };

    return route;
};
