var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'get';
    route.pathParams = {
        'categories': 'category'
    };
    
    route.pagination = true;

    route.handler = function * list(next) {
        var params = this.params;
        params.itemsPerPage = route.itemsPerPage;
        params.page = this.query.page || 0;
        
        if (this.query && this.query.name) {
            params.name = this.query.name;
        }
        
        var routines = yield services.get('routine').listRoutines(params);
        
        this.status = 200;
        this.body = {
            routines: routines
        };
    };

    return route;
};
