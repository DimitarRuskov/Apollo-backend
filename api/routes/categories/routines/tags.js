var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'tags';
    route.method = 'get';
    route.pathParams = {
        'categories': 'category',
        'routines': 'routine'
    };
    
    route.pagination = true;

    route.handler = function * list(next) {
        var params = this.params;
        params.page = this.query.page || 0;
        params.itemsPerPage = route.itemsPerPage;

        var tags = yield services.get('routine').getTags(params);
        
        this.status = 200;
        this.body = {
            tags: tags
        };
    };

    return route;
};
