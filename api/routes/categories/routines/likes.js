var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'likes';
    route.method = 'get';
    route.pathParams = {
        'categories': 'category',
        'routines': 'routine'
    };
    
    route.pagination = true;

    route.handler = function * list(next) {
        var params = this.params;
        params.itemsPerPage = route.itemsPerPage;
        params.page = this.query.page || 0;
        
        var likes = yield services.get('routine').getLikes(params);
        
        this.status = 200;
        this.body = {
            likes: likes
        };
    };

    return route;
};
